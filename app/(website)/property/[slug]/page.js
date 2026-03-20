import "@/app/components/property/property.css";
import Header from "@/app/components/home/Header";
import Footer from "@/app/components/home/Footer";
import PropertyHero from "@/app/components/property/PropertyHero";
import PropertyDescription from "@/app/components/property/PropertyDescription";
import PropertyAmenities from "@/app/components/property/PropertyAmenities";
import PropertySolutions from "@/app/components/property/PropertySolutions";
import PropertyLocationMap from "@/app/components/property/PropertyLocationMap";
import AvailableProperties from "@/app/components/solutions/AvailableProperties";
import Link from "next/link";
import React from "react";
import connectDB from "@/utils/db";
import FooterModel from "@/model/footer.model";
import { getDropdownOptions } from "@/utils/dropdowns";
import { Property } from "@/model/property.model";
import { City } from "@/model/city.model";
import { Area } from "@/model/area.model";
import { Solution } from "@/model/solution.model";
import { Amenity } from "@/model/amenity.model";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  await connectDB();
  const property = await Property.findOne({ slug, isActive: true }).lean();
  
  if (!property) return {};
  
  return {
    title: property.seo?.metaTitle || `${property.name} | SpringHouse Coworking Space`,
    description: property.seo?.metaDescription || property.description || "Discover premium managed workspaces and coworking environments.",
  };
}

export default async function PropertyDetailPage({ params }) {
  const { slug } = await params;

  await connectDB();

  const rawProperty = await Property.findOne({ slug, isActive: true })
    .populate("city", "name slug")
    .populate("area", "name slug")
    .populate("activeSolutions", "name slug image")
    .populate("amenities", "name featuredIcon")
    .lean();

  if (!rawProperty) {
    notFound();
  }

  // Fetch related properties in the same city (excluding the current one)
  let rawRelatedProperties = [];
  let rawOtherCities = [];
  
  if (rawProperty.city) {
    rawRelatedProperties = await Property.find({
      city: rawProperty.city._id,
      _id: { $ne: rawProperty._id },
      isActive: true,
    })
      .populate("city", "name slug")
      .populate("area", "name slug")
      .populate("activeSolutions", "name slug")
      .lean();
      
    rawOtherCities = await City.find({
      _id: { $ne: rawProperty.city._id },
      isActive: true
    }).select("name slug").lean();
  }

  const footerData = (await FooterModel.findOne({}).lean()) || {};
  const phone = footerData?.contactInfo?.phone || "";
  const dropdownOptions = await getDropdownOptions();

  // Serialize Mongoose data for Client Components
  const property = JSON.parse(JSON.stringify(rawProperty));
  const relatedProperties = JSON.parse(JSON.stringify(rawRelatedProperties));
  const otherCities = JSON.parse(JSON.stringify(rawOtherCities));

  return (
    <>
      <Header />

      <PropertyHero property={property} />
      <PropertyDescription
        property={property}
        phone={phone}
        dropdownOptions={dropdownOptions}
      />
      <PropertyAmenities amenities={property.amenities} />
      <PropertySolutions activeSolutions={property.activeSolutions} />
      <PropertyLocationMap locationOnMap={property.locationOnMap} />

      {/* Relational Content using central wrapper layout  */}
      <AvailableProperties properties={relatedProperties} />

      <section className="specfic-prop amenities pt60 pb60">
        <div className="container-fluid">
          <div className="row mb-4">
            <div className="col-lg-6 col-12">
              <span className="section-title-span">Other locations</span>
            </div>
          </div>
          <div className="row">
            {otherCities.map((city) => (
              <div key={city.slug} className="col-md-6 col-6">
                <div className="box-loc mb-lg-0 mb-md-0 mb-3">
                  <Link href={`/coworking-space/${city.slug}`}>{city.name}</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
