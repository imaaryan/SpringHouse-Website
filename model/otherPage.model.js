import mongoose from "mongoose";
import slugify from "slugify";

const otherPageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Page name is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
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

otherPageSchema.pre("save", function (next) {
  if (this.slug) {
    this.slug = slugify(this.slug, { lower: true, strict: true });
  } else if (this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

export const OtherPage =
  mongoose.models.OtherPage || mongoose.model("OtherPage", otherPageSchema);
