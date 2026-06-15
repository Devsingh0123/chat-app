import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";


// GET USERS
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/auth/allusers");

      return res.data.users;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const allUserSlice = createSlice({
  name: "allUsers",
  initialState: {
    users: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default allUserSlice.reducer;