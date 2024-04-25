import store from "@/store";
import { _addMessage } from "@/store/chat";

export const addMessage = (data) => store.dispatch(_addMessage(data));
