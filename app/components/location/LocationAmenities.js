import React from "react";
import Image from "next/image";

export default function LocationAmenities({ amenities }) {
  if (!amenities || amenities.length === 0) {
    return null;
  }

  return (
    <section className=" amenities pt6">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 pb30">
            <span className="section-title-span">AMENITIES</span>
          </div>
        </div>
        <div className="row line pe-3 ps-lg-3 ps-md-3 ps-0">
          {amenities.map((amenity, index) => {
             // Handle potential missing file paths gracefully
             const imgSrc = amenity.featuredIcon?.startsWith("http") 
               ? amenity.featuredIcon
               : `/${amenity.featuredIcon?.replace(/^\//, '') || "assets/amenities/wifi.png"}`;

             return (
               <div key={amenity._id || index} className="col-md-3 col-6 mb-5">
                 <div className="icon-amen text-center d-flex flex-column align-items-center">
                   <div style={{ position: "relative", width: "80px", height: "80px", marginBottom: "8px" }}>
                     <Image
                       src={imgSrc}
                       fill
                       style={{ objectFit: "contain" }}
                       alt={amenity.name}
                     />
                   </div>
                   <a href="#" className="mt-2" style={{ textDecoration: 'none' }}>{amenity.name}</a>
                 </div>
               </div>
             );
          })}
        </div>
      </div>
    </section>
  );
}
