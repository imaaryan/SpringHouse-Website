import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import { Enquiry } from "@/model/enquiry.model";

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();

    // Map frontend form data keys to backend Mongoose schema if needed,
    // though the frontend will be updated to send the correct keys.
    const newEnquiry = new Enquiry({
      fullName: data.fullName || data.full_name,
      companyName: data.companyName || data.company_name,
      email: data.email || data.work_email,
      phoneNumber: Number(data.phoneNumber || data.contact_number),
      selectCity: data.selectCity || data.location,
      selectProperty: data.selectProperty || data.property,
      selectSolution: data.selectSolution || data.solution,
      deskRequirement: Number(data.deskRequirement || data.desk_required),
    });

    await newEnquiry.save();

    return NextResponse.json(
      { success: true, message: "Enquiry submitted successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error submitting enquiry:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit enquiry" },
      { status: 500 },
    );
  }
}
