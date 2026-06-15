import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

// GET MESSAGES
export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/messages/${userId}`);
      return res.data.messages;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

// SEND MESSAGE
export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/messages/send", data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.messages = [];
    },
  },

  extraReducers: (builder) => {
    builder

      // FETCH MESSAGES
      .addCase(fetchMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // SEND MESSAGE
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export const { clearMessages } = messageSlice.actions;
export default messageSlice.reducer;