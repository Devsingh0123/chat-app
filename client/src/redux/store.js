import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import allUsersReducer from "./slices/allUserSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    allUsers: allUsersReducer,
  },
  devTools: true, //for redux devtools
});