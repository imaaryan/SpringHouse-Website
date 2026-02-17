import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    sectionName: {
      type: String,
      required: [true, "Section name is required"],
      trim: true,
    },
    questions: [
      {
        question: String,
        answer: String,
      },
    ],
  },
  { timestamps: true },
);

export const FAQ = mongoose.models.FAQ || mongoose.model("FAQ", faqSchema);
