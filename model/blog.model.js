import mongoose from "mongoose";
import slugify from "slugify";

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

blogSchema.pre("save", function (next) {
  if (this.slug) {
    this.slug = slugify(this.slug, { lower: true, strict: true });
  } else if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
