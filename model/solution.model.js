import mongoose from "mongoose";
import slugify from "slugify";

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
    activeProperties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

solutionSchema.pre("save", function (next) {
  if (this.slug) {
    this.slug = slugify(this.slug, { lower: true, strict: true });
  } else if (this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

export const Solution =
  mongoose.models.Solution || mongoose.model("Solution", solutionSchema);
