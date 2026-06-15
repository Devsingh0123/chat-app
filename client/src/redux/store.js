import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import allUsersReducer from "./slices/allUserSlice";
import messageReducer from "./slices/messageSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    allUsers: allUsersReducer,
    messages: messageReducer,
  },
  devTools: true, //for redux devtools
});