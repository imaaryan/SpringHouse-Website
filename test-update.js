import mongoose from "mongoose";
import "dotenv/config";

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/springhouse";

const aboutUsSchema = new mongoose.Schema(
  {
    mainBanner: String,
    subHeading: String,
    slug: { type: String, unique: true, trim: true, lowercase: true },
    heading: String,
    history: [{ year: Number, content: String }],
    whyUs: [String],
    whoAreWe: [
      {
        title: String,
        description: String,
        frontImg: String,
        backImg: String,
        isReverse: { type: Boolean, default: false },
      },
    ],
    seo: { metaTitle: String, metaDescription: String, codeSnippet: String },
  },
  { timestamps: true }
);

const AboutUs = mongoose.models.AboutUs || mongoose.model("AboutUs", aboutUsSchema);

async function test() {
  await mongoose.connect(MONGO_URI);
  try {
    const aboutUs = await AboutUs.findOne();
    console.log("Found:", aboutUs ? "Yes" : "No");
    
    // Simulate updating
    aboutUs.subHeading = "Test Heading";
    
    // Convert old string whoAreWe elements to Objects to silence CastErrors?
    aboutUs.whoAreWe = [
        {title: "A", description: "B", frontImg: "C", backImg: "D", isReverse: false}
    ];

    await aboutUs.save();
    console.log("Successfully saved!");
  } catch (err) {
    console.error("Mongoose Error:", err.message);
  }
  process.exit();
}
test();
