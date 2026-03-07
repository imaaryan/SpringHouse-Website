import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Footer from "@/model/footer.model";

export async function GET() {
  try {
    await connectDB();
    const footerData = await Footer.findOne();
    return NextResponse.json({ success: true, data: footerData || {} });
  } catch (error) {
    console.error("Footer Fetch Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch footer data" },
      { status: 500 },
    );
  }
}

export async function PUT(request) {
  try {
    await connectDB();
    const body = await request.json();

    const updateData = {
      columns: body.columns || [],
      bottomBlocks: body.bottomBlocks || "",
      socialLinks: body.socialLinks || {
        instagram: "",
        facebook: "",
        linkedin: "",
      },
      contactInfo: body.contactInfo || {
        address: "",
        phone: "",
        whatsapp: "",
        email: "",
      },
    };

    let footerData = await Footer.findOne();

    if (footerData) {
      footerData = await Footer.findByIdAndUpdate(footerData._id, updateData, {
        returnDocument: "after",
      });
    } else {
      footerData = await Footer.create(updateData);
    }

    return NextResponse.json({ success: true, data: footerData });
  } catch (error) {
    console.error("Footer Update Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update footer",
        details: error.message,
      },
      { status: 500 },
    );
  }
}
