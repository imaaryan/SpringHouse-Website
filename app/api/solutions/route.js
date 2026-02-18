import connectDB from "@/utils/db";
import { Solution } from "@/model/solution.model";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  try {
    const solutions = await Solution.find({})
      .populate("testimonials")
      .populate("activeProperties")
      .sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: solutions });
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
    const solution = await Solution.create(body);
    return NextResponse.json(
      { success: true, data: solution },
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
    const { _id, ...updateData } = body;

    if (!_id) {
      return NextResponse.json(
        { success: false, error: "Solution ID is required" },
        { status: 400 },
      );
    }

    const solution = await Solution.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!solution) {
      return NextResponse.json(
        { success: false, error: "Solution not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: solution });
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
        { success: false, error: "Solution ID is required" },
        { status: 400 },
      );
    }

    const deletedSolution = await Solution.findByIdAndDelete(_id);

    if (!deletedSolution) {
      return NextResponse.json(
        { success: false, error: "Solution not found" },
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
