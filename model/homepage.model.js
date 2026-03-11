import mongoose from "mongoose";

const homepageSchema = new mongoose.Schema(
  {
    mainBanner: {
      type: String,
    },
    subHeading: {
      type: String,
    },
    heading: {
      type: String,
    },
    presence: [
      {
        number: Number,
        title: String,
        beforeNumber: String,
        afterNumber: String,
      },
    ],
    activeCities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "City",
      },
    ],
    features: [
      {
        content: String,
        image: String,
      },
    ],
    solutionsForEveryone: {
      content: String,
      image: String,
    },
    networking: {
      title: String,
      content: String,
      image: String,
    },
    ourCommunity: [
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
    seo: {
      metaTitle: String,
      metaDescription: String,
      codeSnippet: String,
    },
  },
  { timestamps: true },
);

export const Homepage =
  mongoose.models.Homepage || mongoose.model("Homepage", homepageSchema);
