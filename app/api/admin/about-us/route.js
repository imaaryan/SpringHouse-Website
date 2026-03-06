import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import { AboutUs } from "@/model/aboutUs.model";
import { uploadImage } from "@/utils/upload";

export async function GET() {
  try {
    await connectDB();
    const aboutUs = await AboutUs.findOne();
    return NextResponse.json({ success: true, data: aboutUs || {} });
  } catch (error) {
    console.error("AboutUs Fetch Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch about us data" },
      { status: 500 },
    );
  }
}

export async function PUT(request) {
  try {
    await connectDB();
    const formData = await request.formData();

    let aboutUs = await AboutUs.findOne();
    if (!aboutUs) {
      aboutUs = await AboutUs.create({});
    }

    // Basic Fields
    const heading = formData.get("heading") || "";
    const subHeading = formData.get("subHeading") || "";

    // Banner Image
    const mainBannerFile = formData.get("mainBanner");
    let mainBannerPath = aboutUs.mainBanner || "";
    if (
      mainBannerFile &&
      typeof mainBannerFile === "object" &&
      mainBannerFile.size > 0
    ) {
      mainBannerPath = await uploadImage(mainBannerFile, "about-us/hero");
    }

    // Array - Presence (4 items)
    const presence = [];
    for (let i = 0; i < 4; i++) {
      presence.push({
        number: Number(formData.get(`presence[${i}][number]`)) || null,
        title: formData.get(`presence[${i}][title]`) || "",
        beforeNumber: formData.get(`presence[${i}][beforeNumber]`) || "",
        afterNumber: formData.get(`presence[${i}][afterNumber]`) || "",
      });
    }

    // Array - History (dynamic)
    const history = [];
    let i = 0;
    while (formData.has(`history[${i}][year]`)) {
      history.push({
        year: Number(formData.get(`history[${i}][year]`)) || null,
        content: formData.get(`history[${i}][content]`) || "",
      });
      i++;
    }

    // Array - Why Us (4 items)
    const whyUs = [];
    for (let j = 0; j < 4; j++) {
      whyUs.push(formData.get(`whyUs[${j}]`) || "");
    }

    // Array - Who Are We (4 items)
    const whoAreWe = [];
    for (let k = 0; k < 4; k++) {
      whoAreWe.push(formData.get(`whoAreWe[${k}]`) || "");
    }

    // Update Payload
    aboutUs.heading = heading;
    aboutUs.subHeading = subHeading;
    aboutUs.mainBanner = mainBannerPath;
    aboutUs.presence = presence;
    aboutUs.history = history;
    aboutUs.whyUs = whyUs;
    aboutUs.whoAreWe = whoAreWe;
    aboutUs.seo = {
      metaTitle: formData.get("seo[metaTitle]") || "",
      metaDescription: formData.get("seo[metaDescription]") || "",
      codeSnippet: formData.get("seo[codeSnippet]") || "",
    };

    await aboutUs.save();

    return NextResponse.json({
      success: true,
      data: aboutUs,
      message: "About Us updated successfully",
    });
  } catch (error) {
    console.error("AboutUs Update Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update about us" },
      { status: 500 },
    );
  }
}
