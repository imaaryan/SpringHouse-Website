import mongoose from "mongoose";
import { applySlugify } from "@/utils/slugMiddleware";

const prSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
    imageURL: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    publishDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export const PR = mongoose.models.PR || mongoose.model("PR", prSchema);
