import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import leavesReducer from "../features/leaves/leavesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    leaves: leavesReducer,
  },
});
