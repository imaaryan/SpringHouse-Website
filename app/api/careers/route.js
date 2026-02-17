import connectDB from "@/utils/db";
import { Career } from "@/model/career.model";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  try {
    const careers = await Career.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: careers });
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
    const career = await Career.create(body);
    return NextResponse.json({ success: true, data: career }, { status: 201 });
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
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Career Application ID is required" },
        { status: 400 },
      );
    }

    const deletedCareer = await Career.findByIdAndDelete(id);

    if (!deletedCareer) {
      return NextResponse.json(
        { success: false, error: "Career Application not found" },
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
