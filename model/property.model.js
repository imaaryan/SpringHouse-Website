import mongoose from "mongoose";
import slugify from "slugify";

const propertySchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: [true, "Property name is required"],
      trim: true,
    },
    images: [
      {
        type: String,
      },
    ],
    area: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Area",
    },
    location: {
      type: String,
    },
    size: {
      type: Number,
    },
    fullAddress: {
      type: String,
    },
    amenities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Amenity",
      },
    ],
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },
    locationOnMap: {
      type: String,
    },
    activeSolutions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Solution",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

propertySchema.pre("save", function (next) {
  if (this.slug) {
    this.slug = slugify(this.slug, { lower: true, strict: true });
  } else if (this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

export const Property =
  mongoose.models.Property || mongoose.model("Property", propertySchema);
