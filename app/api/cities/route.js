import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import { City } from "@/model/city.model";

export async function POST(request) {
  await connectDB();

  const data = await request.json();
  const newCity = await City.create(data);

  return NextResponse.json({ success: true, city: newCity });
}
