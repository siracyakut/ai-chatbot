import dbConnect from "@/app/lib/dbConnect";
import Question from "@/app/models/question";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  await dbConnect();

  try {
    const req = await request.json();
    const question = await Question.findOne({
      question: req.question.toLocaleLowerCase("tr-TR"),
    });
    if (question) {
      return NextResponse.json({ success: true, data: question });
    } else {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(req.question);
      const response = await result.response;
      const text = response.text();
      return NextResponse.json({ success: true, data: text });
    }
  } catch (e) {
    return NextResponse.json({ success: true, data: e.message });
  }
}
