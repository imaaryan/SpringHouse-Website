"use client";
import { useState } from "react";

const ASSET_BASE = "https://mediumspringgreen-salmon-328707.hostingersite.com";

export default function ImageSlider({ images, className, propertyName }) {
  const [index, setIndex] = useState(0);

  const nextImage = (e) => {
    e.preventDefault();
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) {
    return <div className="img-fluid w-100" style={{ background: "#f0f0f0", height: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}>No images</div>;
  }

  const currentImage = images[index];

  return (
    <div className={`${className} slick-initialized slick-slider`}>
      {images.length > 1 && (
        <button className="slick-prev slick-arrow" type="button" onClick={prevImage}>
          Previous
        </button>
      )}
      <div className="slick-list draggable">
        <div className="slick-track">
          <img
            src={`${ASSET_BASE}${currentImage}`}
            alt={propertyName}
            className="img-fluid w-100"
            style={{ height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>
      {images.length > 1 && (
        <button className="slick-next slick-arrow" type="button" onClick={nextImage}>
          Next
        </button>
      )}
    </div>
  );
}