import dbConnect from "@/app/lib/dbConnect";
import Question from "@/app/models/question";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect();

  try {
    const req = await request.json();

    const find = await Question.findOne({
      question: req.question.toLocaleLowerCase("tr-TR"),
    });

    if (find)
      return NextResponse.json({
        success: false,
        data: "Bu soru daha once eklenmis!",
      });

    const newQuestion = new Question({
      question: req.question.toLocaleLowerCase("tr-TR"),
      answer: req.answer.toLocaleLowerCase("tr-TR"),
    });
    await newQuestion.save();

    return NextResponse.json({ success: true, data: newQuestion });
  } catch (e) {
    return NextResponse.json({ success: false, data: e.message });
  }
}
