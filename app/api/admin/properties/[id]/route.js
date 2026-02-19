import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import { Property } from "@/model/property.model";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const property = await Property.findById(id).populate(
      "city area amenities activeSolutions",
    );

    if (!property) {
      return NextResponse.json(
        { success: false, error: "Property not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: property });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch property" },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const deletedProperty = await Property.findByIdAndDelete(id);

    if (!deletedProperty) {
      return NextResponse.json(
        { success: false, error: "Property not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete property" },
      { status: 500 },
    );
  }
}

// PUT method for edit can be added here similarly
