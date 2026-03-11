import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import { City } from "@/model/city.model";
import { Area } from "@/model/area.model";
import { uploadImage } from "@/utils/upload"; // Import uploadImage

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const city = await City.findById(id);

    if (!city) {
      return NextResponse.json(
        { success: false, error: "City not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: city });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch city" },
      { status: 500 },
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const formData = await request.formData();

    const existingCity = await City.findById(id);
    if (!existingCity) {
      return NextResponse.json(
        { success: false, error: "City not found" },
        { status: 404 },
      );
    }

    const name = formData.get("name");
    const slug = formData.get("slug");
    const description = formData.get("description");
    const isActive = formData.get("isActive") === "true";

    // Amenities
    const amenities = formData.getAll("amenities");

    // Solutions For Everyone
    const solutionsContent = formData.get("solutionsForEveryone[content]");

    // Images
    const imageFile = formData.get("image");
    const solutionImageFile = formData.get("solutionsForEveryoneImage");

    let imagePath = existingCity.image;
    if (imageFile && typeof imageFile === "object" && imageFile.size > 0) {
      imagePath = await uploadImage(imageFile, "cities");
    }

    let solutionImagePath = existingCity.solutionsForEveryone?.image;
    if (
      solutionImageFile &&
      typeof solutionImageFile === "object" &&
      solutionImageFile.size > 0
    ) {
      solutionImagePath = await uploadImage(
        solutionImageFile,
        "cities/solutions",
      );
    }

    const updatePayload = {
      name,
      slug,
      description,
      isActive,
      amenities,
      image: imagePath,
      solutionsForEveryone: {
        content: solutionsContent !== null ? solutionsContent : existingCity.solutionsForEveryone?.content,
        image: solutionImagePath,
      },
      seo: {
        metaTitle: formData.get("seo[metaTitle]"),
        metaDescription: formData.get("seo[metaDescription]"),
        codeSnippet: formData.get("seo[codeSnippet]"),
      },
    };

    const updatedCity = await City.findByIdAndUpdate(id, updatePayload, {
      returnDocument: "after",
      runValidators: true,
    });

    return NextResponse.json({
      success: true,
      data: updatedCity,
      message: "City updated successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: "City name or slug already exists" },
        { status: 400 },
      );
    }
    console.error("Update City Error:", error);
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
    // Also delete associated Areas?
    await Area.deleteMany({ city: id });

    return NextResponse.json({ success: true, message: "Deleted" });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: "Failed" },
      { status: 500 },
    );
  }
}
