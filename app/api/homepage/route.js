import connectDB from "@/utils/db";
import { Homepage } from "@/model/homepage.model";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  try {
    let homepage = await Homepage.findOne({});

    if (!homepage) {
      return NextResponse.json({ success: true, data: null });
    }

    homepage = await homepage.populate("activeCities");
    homepage = await homepage.populate("testimonials");

    return NextResponse.json({ success: true, data: homepage });
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
    const homepage = await Homepage.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    });

    return NextResponse.json(
      { success: true, data: homepage },
      { status: 201 },
    );
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

    // Singleton Pattern: Update the single existing document or create if missing
    const homepage = await Homepage.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    });

    return NextResponse.json({ success: true, data: homepage });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}
