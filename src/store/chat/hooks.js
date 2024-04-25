import { useSelector } from "react-redux";

export const useMessages = () => useSelector((state) => state.chat.messages);
