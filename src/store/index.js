import { configureStore } from "@reduxjs/toolkit";
import chat from "@/store/chat";

const store = configureStore({
  reducer: {
    chat,
  },
  devTools: false,
});

export default store;
