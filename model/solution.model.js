import mongoose from "mongoose";
import { applySlugify } from "../utils/slugMiddleware.js";

const solutionSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: [true, "Solution name is required"],
      trim: true,
    },
    image: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    fourPoints: [
      {
        type: String,
      },
    ],
    testimonials: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Testimonial",
      },
    ],
    companyImages: [
      {
        type: String,
      },
    ],
    featuredSpaces: [
      {
        name: String,
        image: String,
      },
    ],
    ourCommunity: [
      {
        type: String,
      },
    ],
    networking: {
      title: { type: String, default: "" },
      content: { type: String, default: "" },
      image: { type: String, default: "" },
      tooltips: {
        type: [String],
        default: ["", "", ""],
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    seo: {
      metaTitle: String,
      metaDescription: String,
      codeSnippet: String,
    },
  },
  { timestamps: true },
);

applySlugify(solutionSchema, "name");

export const Solution =
  mongoose.models.Solution || mongoose.model("Solution", solutionSchema);

// Force clear cache in development if schema changed
if (process.env.NODE_ENV !== "production") {
  delete mongoose.models.Solution;
}

export { Solution };
