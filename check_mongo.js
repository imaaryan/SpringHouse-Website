const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.local" });

const { Homepage } = require("./model/homepage.model");

async function check() {
  await mongoose.connect(process.env.MONGODB_URI);
  const hp = await Homepage.findOne({}).lean();
  console.log("Networking:", hp?.networking);
  process.exit(0);
}
check();
