import mongoose from "mongoose";
import { applySlugify } from "@/utils/slugMiddleware";

const aboutUsSchema = new mongoose.Schema(
  {
    mainBanner: {
      type: String,
    },
    subHeading: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
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
    seo: {
      metaTitle: String,
      metaDescription: String,
      codeSnippet: String,
    },
  },
  { timestamps: true },
);

applySlugify(aboutUsSchema, "heading");

export const AboutUs =
  mongoose.models.AboutUs || mongoose.model("AboutUs", aboutUsSchema);
