import mongoose from "mongoose";
import dotenv from "dotenv";
import { City } from "../model/city.model.js";
import { Area } from "../model/area.model.js";
import { Solution } from "../model/solution.model.js";
import { Amenity } from "../model/amenity.model.js";
import { Property } from "../model/property.model.js";
import { Testimonial } from "../model/testimonial.model.js";
import { Career } from "../model/career.model.js";
import { FAQ } from "../model/faq.model.js";
import { OtherPage } from "../model/otherPage.model.js";
import { Blog } from "../model/blog.model.js";
import { Enquiry } from "../model/enquiry.model.js";
import { Homepage } from "../model/homepage.model.js";
import { AboutUs } from "../model/aboutUs.model.js";
import * as DummyData from "../dummyData.js";

dotenv.config({ path: ".env" });

const seedData = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB for seeding...");

    // 1. Clear existing data
    await Promise.all([
      City.deleteMany({}),
      Area.deleteMany({}),
      Solution.deleteMany({}),
      Amenity.deleteMany({}),
      Property.deleteMany({}),
      Testimonial.deleteMany({}),
      Career.deleteMany({}),
      FAQ.deleteMany({}),
      OtherPage.deleteMany({}),
      Blog.deleteMany({}),
      Enquiry.deleteMany({}),
      Homepage.deleteMany({}),
      AboutUs.deleteMany({}),
    ]);
    console.log("Cleared existing data.");

    // 2. Insert Independent Data first (Amenities, Testimonials)
    // Map old IDs to new MongoDB ObjectIds if needed, OR just insert and let Mongo create IDs
    // Since dummyData has 'id' field strings like "uniqeIDofCity", we might want to keep them or relying on _id.
    // However, models don't have custom _id defined. So new _id will be generated.
    // If we want to link them, we need to map the string IDs to the new ObjectIds.

    const idMap = {}; // "uniqeIDofCity" -> ObjectId("...")

    // --- Amenities ---
    const createdAmenities = await Amenity.insertMany(DummyData.Amenities);
    // Assuming only 1 item in dummyData for now based on file content, but code handles array.
    // If we need strict mapping, we would loop.
    // Since dummyData.js has placeholder strings, maintaining relationships (likes Property -> City)
    // requires we know which new ID corresponds to "uniqeIDofCity".

    // Let's create a helper to map ID if present in dummy data
    // But wait, standard insertMany won't return the "uniqeIDof..." unless we saved it in schema.
    // Our schemas don't have 'id' field, only _id.
    // So 'id' from dummyData will be ignored (unless strict: false).

    // Better strategy:
    // Create City first and store its _id.
    // Then use that _id when creating Area/Property.

    // --- Amenities ---
    // Seed Amenities first because City depends on them
    for (const amData of DummyData.Amenities) {
      const { id, ...data } = amData;
      const newAm = await Amenity.create(data);
      if (id) idMap[id] = newAm._id;
    }
    console.log("Amenities seeded.");

    // --- City ---
    // Now seed City, mapping amenities if present
    for (const cityData of DummyData.City) {
      const { id, amenities, ...data } = cityData;

      const mappedAmenities =
        amenities?.map((aid) => idMap[aid]).filter(Boolean) || [];

      const newCity = await City.create({
        ...data,
        amenities: mappedAmenities,
      });
      if (id) idMap[id] = newCity._id;
    }
    console.log("Cities seeded.");

    // --- Area ---
    for (const areaData of DummyData.Area) {
      const { id, city, ...data } = areaData;
      // Replace string ID with real ObjectId if found
      const cityId = idMap[city] || null;
      const newArea = await Area.create({ ...data, city: cityId });
      if (id) idMap[id] = newArea._id;
    }
    console.log("Areas seeded.");

    // --- Testimonials ---
    for (const tData of DummyData.Testimonials) {
      const { id, ...data } = tData;
      const newT = await Testimonial.create(data);
      if (id) idMap[id] = newT._id;
    }
    console.log("Testimonials seeded.");

    // --- Solution ---
    for (const solData of DummyData.Solutions) {
      const { id, testimonials, activeProperties, ...data } = solData;

      const mappedTestimonials =
        testimonials?.map((tid) => idMap[tid]).filter(Boolean) || [];

      // Create solution first (without activeProperties to avoid circular dependency issues if any,
      // though properties depend on area/city usually).
      const newSol = await Solution.create({
        ...data,
        testimonials: mappedTestimonials,
      });
      if (id) idMap[id] = newSol._id;
    }
    console.log("Solutions seeded.");

    // --- Property ---
    for (const propData of DummyData.Property) {
      const { id, area, city, amenities, activeSolutions, ...data } = propData;

      const mappedArea = idMap[area];
      const mappedCity = idMap[city];
      const mappedAmenities =
        amenities?.map((aid) => idMap[aid]).filter(Boolean) || [];
      const mappedSolutions =
        activeSolutions?.map((sid) => idMap[sid]).filter(Boolean) || [];

      const newProp = await Property.create({
        ...data,
        area: mappedArea,
        city: mappedCity,
        amenities: mappedAmenities,
        activeSolutions: mappedSolutions,
      });
      if (id) idMap[id] = newProp._id;
    }
    console.log("Properties seeded.");

    // --- Now update Solution with activeProperties if needed ---
    // If we want bidirectional link.
    // For now, skipping recursive update to keep it simple unless requested.

    // --- Others ---
    await Career.insertMany(DummyData.Careers);
    await FAQ.insertMany(DummyData.FAQ);
    await OtherPage.insertMany(DummyData.OtherPages);
    await Blog.insertMany(DummyData.Blogs);
    await Enquiry.insertMany(DummyData.Enquires);

    // --- Homepage & AboutUs ---
    // These might have refs.
    // Homepage has activeCities (Ref City), testimonials (Ref Testimonial)

    const homepageData = DummyData.Homepage;
    if (homepageData) {
      const mappedCities =
        homepageData.activeCities?.map((cid) => idMap[cid]).filter(Boolean) ||
        [];
      const mappedTestimonials =
        homepageData.testimonials?.map((tid) => idMap[tid]).filter(Boolean) ||
        [];

      await Homepage.create({
        ...homepageData,
        activeCities: mappedCities,
        testimonials: mappedTestimonials,
      });
    }

    const aboutUsData = DummyData.Aboutus;
    if (aboutUsData) {
      await AboutUs.create(aboutUsData);
    }

    console.log("Seeding complete successfully!");
    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedData();
