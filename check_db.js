import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); // Reads .env

async function check() {
  try {
    const uri = process.env.MONGODB_URI;
    console.log("URI:", uri ? "Found" : "Missing");
    await mongoose.connect(uri);
    console.log("Connected");
    
    const propertySchema = new mongoose.Schema({}, { strict: false });
    const Property = mongoose.model("Property", propertySchema, "properties");
    
    const areasSchema = new mongoose.Schema({}, { strict: false });
    const Area = mongoose.model("Area", areasSchema, "areas");
    
    const properties = await Property.find({}).limit(5).lean();
    console.log("Properties found:", properties.length);
    for (const p of properties) {
        let areaName = 'null';
        if (p.area) {
           const area = await Area.findById(p.area).lean();
           areaName = area ? area.name : 'null';
        }
        console.log(`Name: ${p.name}, Slug: ${p.slug}, Code: ${p.propertyCode}, Area: ${areaName}`);
    }
  } catch (error) {
    console.error("Error", error);
  } finally {
    process.exit(0);
  }
}
check();
