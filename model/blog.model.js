import mongoose from "mongoose";
import { applySlugify } from "../utils/slugMiddleware.js";

const blogSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    imageURL: {
      type: String,
    },
    content: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

applySlugify(blogSchema, "title");

export const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
