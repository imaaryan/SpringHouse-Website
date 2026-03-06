import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import { Header } from "@/model/header.model";
import { uploadImage } from "@/utils/upload";

export async function GET() {
  await connectDB();
  try {
    const headerData = await Header.findOne({});
    return NextResponse.json({ success: true, data: headerData || {} });
  } catch (error) {
    console.error("Header Fetch Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch header data" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const formData = await request.formData();
    const body = {};

    // Map through FormData to dynamically build fields
    for (const key of formData.keys()) {
      if (key === "logo") continue; // Handled separately below

      // The menu is a complex array of objects, so it arrives stringified
      if (key === "menu") {
        try {
          body[key] = JSON.parse(formData.get(key));
        } catch (e) {
          console.error("Failed to parse menu array", e);
          body[key] = [];
        }
      } else {
        body[key] = formData.get(key);
      }
    }

    // Handle Logo Image Upload
    const logoFile = formData.get("logo");
    if (logoFile instanceof File) {
      const path = await uploadImage(logoFile, "header");
      if (path) body.logo = path;
    } else if (typeof logoFile === "string" && logoFile !== "null") {
      body.logo = logoFile;
    }

    // Upsert Singleton Document
    let headerData = await Header.findOne({});

    if (headerData) {
      headerData.set(body);
    } else {
      headerData = new Header(body);
    }

    await headerData.save();

    return NextResponse.json({ success: true, data: headerData });
  } catch (error) {
    console.error("Header Update Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update header",
        details: error.message,
      },
      { status: 500 },
    );
  }
}

export async function PUT(request) {
  // Singleton pattern - PUT is same as POST
  return POST(request);
}
