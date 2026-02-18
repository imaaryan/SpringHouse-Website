import connectDB from "@/utils/db";
import { AboutUs } from "@/model/aboutUs.model";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  try {
    const aboutUs = await AboutUs.findOne({});
    return NextResponse.json({ success: true, data: aboutUs || null });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    let aboutUs = await AboutUs.findOne({});

    if (aboutUs) {
      // Update existing document
      aboutUs.set(body);
    } else {
      // Create new document
      aboutUs = new AboutUs(body);
    }

    // Saving triggers the pre('save') middleware (slug generation)
    await aboutUs.save();

    return NextResponse.json({ success: true, data: aboutUs }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

export async function PUT(request) {
  try {
    await connectDB();
    const body = await request.json();

    let aboutUs = await AboutUs.findOne({});

    if (aboutUs) {
      aboutUs.set(body);
    } else {
      aboutUs = new AboutUs(body);
    }

    await aboutUs.save();

    return NextResponse.json({ success: true, data: aboutUs });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}
