import mongoose from "mongoose";
import dotenv from "dotenv";
import Footer from "./model/footer.model.js";

dotenv.config({ path: ".env.local" });
if (!process.env.MONGODB_URI) {
  dotenv.config({ path: ".env" });
}

async function testSave() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const updateData = {
      columns: [],
      bottomBlocks: "testing",
      socialLinks: { instagram: "", facebook: "", linkedin: "" },
      contactInfo: { address: "", phone: "", whatsapp: "", email: "" },
    };

    let footerData = await Footer.findOne();
    if (footerData) {
      console.log("Found existing footer, updating...");
      footerData = await Footer.findByIdAndUpdate(footerData._id, updateData, {
        new: true,
        runValidators: true,
      });
    } else {
      console.log("No footer found, creating...");
      footerData = await Footer.create(updateData);
    }

    console.log("Success:", footerData);
    process.exit(0);
  } catch (err) {
    console.error("Test Save Error:", err);
    process.exit(1);
  }
}

testSave();
