import { post } from "@/utils/request";

export const addQuestionService = (data) => post("/api/chat/add", data);
export const getQuestionService = (data) => post("/api/chat/get", data);
