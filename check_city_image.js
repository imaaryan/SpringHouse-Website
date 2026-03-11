import "dotenv/config";
import connectDB from "./utils/db.js";
import { City } from "./model/city.model.js";

async function run() {
  await connectDB();
  const cities = await City.find({}).lean();
  console.log(cities.map(c => ({ slug: c.slug, image: c.image })));
  process.exit(0);
}

run();
