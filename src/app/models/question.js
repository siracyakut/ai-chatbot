import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const Question =
  mongoose.models.questions || mongoose.model("questions", questionSchema);

export default Question;
