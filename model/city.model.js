import mongoose from "mongoose";
import slugify from "slugify";

const citySchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: [true, "City name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    amenities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Amenity",
      },
    ],
    solutionsForEveryone: {
      content: {
        type: String,
      },
      image: {
        type: String,
      },
      cta: {
        type: String,
      },
      ctaLink: {
        type: String,
      },
    },
  },
  { timestamps: true },
);

citySchema.pre("save", function (next) {
  if (this.slug) {
    this.slug = slugify(this.slug, { lower: true, strict: true });
  } else if (this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

export const City = mongoose.models.City || mongoose.model("City", citySchema);
