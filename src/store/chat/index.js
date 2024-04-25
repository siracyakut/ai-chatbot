import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

const chat = createSlice({
  name: "chat",
  initialState,
  reducers: {
    _addMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
  },
});

export const { _addMessage } = chat.actions;
export default chat.reducer;
