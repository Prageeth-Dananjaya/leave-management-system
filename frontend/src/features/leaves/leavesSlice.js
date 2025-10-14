import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchLeaves = createAsyncThunk(
  "leaves/fetchLeaves",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/leaves");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const createLeave = createAsyncThunk(
  "leaves/createLeave",
  async (data, thunkAPI) => {
    try {
      const res = await api.post("/leaves", data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const updateLeave = createAsyncThunk(
  "leaves/updateLeave",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await api.get(`/leaves/${id}`, data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const deleteLeave = createAsyncThunk(
  "leaves/deleteLeave",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/leaves/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

const leavesSlice = createSlice({
  name: "leaves",
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaves.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaves.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchLeaves.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createLeave.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLeave.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createLeave.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateLeave.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLeave.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex((l) => l.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(updateLeave.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteLeave.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLeave.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((l) => l.id !== action.payload);
      })
      .addCase(deleteLeave.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default leavesSlice.reducer;
