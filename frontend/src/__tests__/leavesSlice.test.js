import { configureStore } from "@reduxjs/toolkit";
import leavesReducer, {
  createLeave,
  updateLeave,
  deleteLeave,
} from "../features/leaves/leavesSlice";
import api from "../services/api";

jest.mock("../services/api");

describe("Leaves Slice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: { leaves: leavesReducer },
    });
    jest.clearAllMocks();
  });

  describe("createLeave", () => {
    it("dispatches fulfilled action when leave creation succeeds", async () => {
      const newLeave = {
        id: 1,
        fromDate: "2025-10-20",
        toDate: "2025-10-22",
        reason: "Vacation",
      };
      api.post.mockResolvedValue({ data: newLeave });

      await store.dispatch(createLeave(newLeave));

      const state = store.getState();
      expect(state.leaves.list).toContainEqual(newLeave);
    });

    it("dispatches rejected action when leave creation fails", async () => {
      api.post.mockRejectedValue({ response: { data: { message: "Error" } } });

      await store.dispatch(createLeave({}));

      const state = store.getState();
      expect(state.leaves.error).toBe("Error");
    });
  });

  describe("updateLeave", () => {
    it("updates leave status correctly", async () => {
      const leave = { id: 1, status: "Pending" };
      const updatedLeave = { ...leave, status: "Approved" };
      api.put.mockResolvedValue({ data: updatedLeave });

      // Seed the store
      store = configureStore({
        reducer: { leaves: leavesReducer },
        preloadedState: {
          leaves: { list: [leave], loading: false, error: null },
        },
      });

      await store.dispatch(
        updateLeave({ id: 1, data: { status: "Approved" } })
      );

      const state = store.getState();
      expect(state.leaves.list[0].status).toBe("Approved");
    });

    it("handles update rejection", async () => {
      api.put.mockRejectedValue({
        response: { data: { message: "Cannot update" } },
      });

      await store.dispatch(
        updateLeave({ id: 1, data: { status: "Rejected" } })
      );

      const state = store.getState();
      expect(state.leaves.error).toBe("Cannot update");
    });
  });

  describe("deleteLeave", () => {
    it("deletes leave successfully", async () => {
      api.delete.mockResolvedValue({});

      // Seed the store
      store = configureStore({
        reducer: { leaves: leavesReducer },
        preloadedState: {
          leaves: { list: [{ id: 1 }], loading: false, error: null },
        },
      });

      await store.dispatch(deleteLeave(1));

      const state = store.getState();
      expect(state.leaves.list).toHaveLength(0);
    });
  });

  describe("reducer", () => {
    it("handles createLeave.fulfilled", () => {
      const prevState = { list: [], loading: false, error: null };
      const newLeave = {
        id: 1,
        fromDate: "2025-10-20",
        toDate: "2025-10-22",
        reason: "Vacation",
      };

      const nextState = leavesReducer(prevState, {
        type: createLeave.fulfilled.type,
        payload: newLeave,
      });

      expect(nextState.list).toContainEqual(newLeave);
    });

    it("handles updateLeave.fulfilled", () => {
      const prevState = {
        list: [{ id: 1, status: "Pending" }],
        loading: false,
        error: null,
      };
      const updatedLeave = { id: 1, status: "Approved" };

      const nextState = leavesReducer(prevState, {
        type: updateLeave.fulfilled.type,
        payload: updatedLeave,
      });

      expect(nextState.list[0].status).toBe("Approved");
    });

    it("handles deleteLeave.fulfilled", () => {
      const prevState = {
        list: [{ id: 1 }, { id: 2 }],
        loading: false,
        error: null,
      };

      const nextState = leavesReducer(prevState, {
        type: deleteLeave.fulfilled.type,
        payload: 1,
      });

      expect(nextState.list).toHaveLength(1);
      expect(nextState.list[0].id).toBe(2);
    });
  });
});
