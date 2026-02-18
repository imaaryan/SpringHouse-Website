import connectDB from "@/utils/db";
import { Amenity } from "@/model/amenity.model";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  try {
    const amenities = await Amenity.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: amenities });
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
    const amenity = await Amenity.create(body);
    return NextResponse.json({ success: true, data: amenity }, { status: 201 });
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
    const { _id, ...updateData } = body;

    if (!_id) {
      return NextResponse.json(
        { success: false, error: "Amenity ID is required" },
        { status: 400 },
      );
    }

    const amenity = await Amenity.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!amenity) {
      return NextResponse.json(
        { success: false, error: "Amenity not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: amenity });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { _id } = body;

    if (!_id) {
      return NextResponse.json(
        { success: false, error: "Amenity ID is required" },
        { status: 400 },
      );
    }

    const deletedAmenity = await Amenity.findByIdAndDelete(_id);

    if (!deletedAmenity) {
      return NextResponse.json(
        { success: false, error: "Amenity not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}
