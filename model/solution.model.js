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
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

applySlugify(solutionSchema, "name");

export const Solution =
  mongoose.models.Solution || mongoose.model("Solution", solutionSchema);
