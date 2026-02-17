import mongoose from "mongoose";

const careerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
    },
    contactNumber: {
      type: Number,
    },
    applyingFor: {
      type: String,
    },
    resume: {
      type: String,
    },
    linkedinURL: {
      type: String,
    },
    whyWannaJoin: {
      type: String,
    },
  },
  { timestamps: true },
);

export const Career =
  mongoose.models.Career || mongoose.model("Career", careerSchema);
