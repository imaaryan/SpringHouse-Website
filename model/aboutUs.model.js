import mongoose from "mongoose";

const aboutUsSchema = new mongoose.Schema(
  {
    mainBanner: {
      type: String,
    },
    subHeading: {
      type: String,
    },
    heading: {
      type: String,
    },
    history: [
      {
        year: Number,
        content: String,
      },
    ],
    presence: [
      {
        number: Number,
        title: String,
        beforeNumber: String,
        afterNumber: String,
      },
    ],
    whyUs: [
      {
        type: String,
      },
    ],
    whoAreWe: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);

export const AboutUs =
  mongoose.models.AboutUs || mongoose.model("AboutUs", aboutUsSchema);
