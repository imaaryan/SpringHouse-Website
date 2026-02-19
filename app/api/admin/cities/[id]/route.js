import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import { City } from "@/model/city.model";

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const { name, seo } = await request.json();

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400 },
      );
    }

    const updatedCity = await City.findByIdAndUpdate(
      id,
      { name, seo },
      { new: true, runValidators: true },
    );

    if (!updatedCity) {
      return NextResponse.json(
        { success: false, error: "City not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedCity,
      message: "City updated successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: "City name already exists" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to update city" },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    await City.findByIdAndDelete(id);
    // Cascade delete areas? handled in bulk delete, here for single.
    // For consistency, let's just use the bulk delete endpoint from UI for single delete too (passing array of 1).
    // But implementing single DELETE here is good practice.
    return NextResponse.json({ success: true, message: "Deleted" });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: "Failed" },
      { status: 500 },
    );
  }
}
