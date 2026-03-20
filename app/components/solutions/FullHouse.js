"use client";

import React from "react";

export default function FullHouse({ images }) {
  if (!images || images.length === 0) return null;

  return (
    <section className="flex-sec ptb60">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 mb-4">
            <span className="section-title-span mb-3">Full House</span>
          </div>
        </div>
        <div className="row">
          <div className="d-flex">
            {images.map((imgUrl, index) => (
              <div className="inner-box" key={index}>
                <a
                  href={imgUrl}
                  data-lightbox={`group${index + 1}`}
                  data-title={`Project ${index + 1}`}
                  className="cc-f"
                >
                  <img
                    src={imgUrl}
                    className="img-grow"
                    alt={`Full House ${index + 1}`}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
