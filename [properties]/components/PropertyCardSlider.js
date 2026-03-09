"use client";
import { useState } from "react";
import "./Solution.css";

export default function PropertyCardSlider({ property }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = property.images || [];
  const currentImage = images[currentImageIndex] || "";

  const nextImage = () => {
    if (images.length) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images.length) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? images.length - 1 : prev - 1,
      );
    }
  };

  return (
    <div className="col-md-6 col-12 back pe-4 mb-4">
      <div className="row">
        {/* Image Slider */}
        <div className="image-size-property col-lg-4 col-md-4 col-12 position-relative p-0">
          <div className="image-slider1">
            {images.length > 0 ? (
              <>
                <button
                  className="slick-prev slick-arrow"
                  aria-label="Previous"
                  type="button"
                  onClick={prevImage}
                  style={{ display: images.length > 1 ? "block" : "none" }}
                >
                  Previous
                </button>

                <div className="slick-list draggable">
                  <div className="slick-track">
                    <img
                      src={`https://mediumspringgreen-salmon-328707.hostingersite.com/${currentImage}`}
                      alt={property.name}
                      className="img-fluid w-100"
                    />
                  </div>
                </div>

                <button
                  className="slick-next slick-arrow"
                  aria-label="Next"
                  type="button"
                  onClick={nextImage}
                  style={{ display: images.length > 1 ? "block" : "none" }}
                >
                  Next
                </button>
              </>
            ) : (
              <div
                className="img-fluid w-100"
                style={{
                  background: "#f0f0f0",
                  height: "200px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                No images available
              </div>
            )}
          </div>

          <div className="service-img1 service-img2">
            <div className="shape-bottom-right">
              <div className="shape-right-top">
                <svg viewBox="0 0 11 11" width="5" height="5">
                  <path d="M11 0L0 0L0 11C0 4.92 4.92 0 11 0Z" fill="#f6f4f4" />
                </svg>
              </div>

              <div className="shape-left-bottom">
                <svg viewBox="0 0 11 11" width="5" height="5">
                  <path d="M11 0L0 0L0 11C0 4.92 4.92 0 11 0Z" fill="#ffffff" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="image-size-propertydetail col-md-8 col-12 position-relative padding-b pt-3 pb-md-0 pb-lg-0 ps-lg-4 ps-md-4 ps-3 pb-3 d-flex flex-column justify-content-start">
          <div className="ps-lg-4 ps-md-4 ps-0">
            <div className="text-small mb-lg-3 mb-md-3 mb-1">
              {property.propertyCode}
            </div>

            <div className="h5 mb-0">{property.name}</div>

            <div className="text-small mb-2">{property.fullAddress}</div>

            {property.size && (
              <div className="text-small mb-2">
                <strong>Size:</strong> {property.size.toLocaleString()} sq. ft.
              </div>
            )}
          </div>

          <div className="bottom-right">
            <a
              href={`/coworking-space/${property.city.slug}/${property.slug}`}
              className="details-link detail"
            >
              DETAILS
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
