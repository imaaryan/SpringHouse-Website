import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      trim: true,
      default: "+91",
    },
    whatsappNumber: {
      type: String,
      trim: true,
      default: "+91",
    },
  },
  { timestamps: true },
);

if (mongoose.models.Setting) {
  delete mongoose.models.Setting;
}
export const Setting = mongoose.model("Setting", settingSchema);
