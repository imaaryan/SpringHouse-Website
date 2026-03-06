import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import { Setting } from "@/model/setting.model";

export async function GET() {
  try {
    await connectDB();
    let settings = await Setting.findOne().lean();

    // Singleton pattern: If no settings document exists, create an empty default one immediately
    if (!settings) {
      settings = await Setting.create({});
    }

    return NextResponse.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error("Settings fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch settings" },
      { status: 500 },
    );
  }
}

export async function PUT(request) {
  try {
    await connectDB();
    const payload = await request.json();

    let settings = await Setting.findOne();

    if (!settings) {
      settings = await Setting.create(payload);
    } else {
      settings = await Setting.findByIdAndUpdate(settings._id, payload, {
        new: true,
      });
    }

    return NextResponse.json({
      success: true,
      data: settings,
      message: "Settings updated successfully",
    });
  } catch (error) {
    console.error("Settings update error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update settings" },
      { status: 500 },
    );
  }
}
