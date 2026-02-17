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

    // Optimized: Upsert (Update if exists, Insert if not)
    const aboutUs = await AboutUs.findOneAndUpdate(
      {}, // Filter: Find any document (since it's a singleton)
      body,
      {
        new: true, // Return modified document
        upsert: true, // Create if not found
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );

    return NextResponse.json({ success: true, data: aboutUs }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}
