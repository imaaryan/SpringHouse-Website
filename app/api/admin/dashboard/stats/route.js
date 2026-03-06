import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import { Property } from "@/model/property.model";
import { City } from "@/model/city.model";
import { Area } from "@/model/area.model";
import { Enquiry } from "@/model/enquiry.model";

export async function GET() {
  try {
    await connectDB();

    const [propertyCount, cityCount, areaCount, enquiryCount] =
      await Promise.all([
        Property.countDocuments(),
        City.countDocuments(),
        Area.countDocuments(),
        Enquiry.countDocuments({ isRead: false }),
      ]);

    return NextResponse.json({
      success: true,
      data: {
        properties: propertyCount,
        cities: cityCount,
        areas: areaCount,
        enquiries: enquiryCount,
      },
      // You can add recent activity fetching here later
    });
  } catch (error) {
    console.error("Dashboard stats fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch dashboard stats" },
      { status: 500 },
    );
  }
}
