import connectDB from "@/utils/db";
import { Enquiry } from "@/model/enquiry.model";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const enquiry = await Enquiry.create(body);
    return NextResponse.json({ success: true, data: enquiry }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

export async function GET() {
  await connectDB();
  try {
    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: enquiries });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// PUT to update status (e.g. read/unread)
export async function PUT(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Enquiry ID is required" },
        { status: 400 },
      );
    }

    const enquiry = await Enquiry.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!enquiry) {
      return NextResponse.json(
        { success: false, error: "Enquiry not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: enquiry });
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
        { success: false, error: "Enquiry ID is required" },
        { status: 400 },
      );
    }

    const deletedEnquiry = await Enquiry.findByIdAndDelete(id);

    if (!deletedEnquiry) {
      return NextResponse.json(
        { success: false, error: "Enquiry not found" },
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
