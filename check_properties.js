import connectDB from "./utils/db.js";
import { Property } from "./model/property.model.js";

async function check() {
  await connectDB();
  const properties = await Property.find({}).populate('area').limit(5).lean();
  console.log("Properties found:", properties.length);
  for (const p of properties) {
    console.log(`Name: ${p.name}, Slug: ${p.slug}, Code: ${p.propertyCode}, Area: ${p.area ? p.area.name : 'null'}`);
  }
  process.exit(0);
}
check();
