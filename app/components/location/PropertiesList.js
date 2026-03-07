"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PropertiesList() {
  const sliderRef = useRef(null);

  useEffect(() => {
    // Only run on the client-side
    if (typeof window === "undefined" || !window.$) return;

    const initSlick = () => {
      // Check if slick gets loaded globally
      if (window.$ && typeof window.$.fn.slick === "function") {
        window.$(".image-slider1").not(".slick-initialized").slick({
          dots: true,
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          adaptiveHeight: true,
          arrows: true,
        });
      } else {
        // If not loaded yet, wait a bit and try again
        setTimeout(initSlick, 500);
      }
    };

    initSlick();

    // Cleanup: destroy slick on unmount if initialized
    return () => {
      if (window.$ && typeof window.$.fn.slick === "function") {
        const slider = window.$(".image-slider1");
        if (slider.hasClass("slick-initialized")) {
          slider.slick("unslick");
        }
      }
    };
  }, []);

  return (
    <section className="specfic-prop pt-lg-4 pt-md-4 pt-5" id="golf-course">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <span className="section-title-span">properties</span>
          </div>
        </div>
        <div className="row pe-3 ps-3">
          {/* ----- Golf Course Road Property ----- */}
          <div className="col-md-12 pt-3" id="Golf Course Road">
            <div className="loaction-tab">
              <a href="#">Golf Course Road</a>
            </div>
          </div>
          <div className="col-md-6 back pe-4 mb-4">
            <div className="row">
              <div className="col-md-4 col-lg-4 col-12 position-relative p-0">
                <div className="image-slider1">
                  <div>
                    <img
                      alt="Property Image"
                      className="img-fluid w-100"
                      src="/assets/locationproperty/locationproperty/1747996795_Coworking.png"
                    />
                  </div>
                  <div>
                    <img
                      alt="Property Image"
                      className="img-fluid w-100"
                      src="/assets/locationproperty/locationproperty/1747997998_Coworking.png"
                    />
                  </div>
                  <div>
                    <img
                      alt="Property Image"
                      className="img-fluid w-100"
                      src="/assets/locationproperty/locationproperty/1748003705_Coworking.png"
                    />
                  </div>
                </div>
                <div className="service-img1 service-img2">
                  <div className="shape-bottom-right">
                    <div className="shape-right-top">
                      <svg
                        fill="none"
                        style={{
                          width: "5px",
                          height: "5px",
                          stroke: "#f6f4f4",
                        }}
                        viewBox="0 0 11 11"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 1.54972e-06L0 0L2.38419e-07 11C1.65973e-07 4.92487 4.92487 1.62217e-06 11 1.54972e-06Z"
                          fill="#f6f4f4"
                        ></path>
                      </svg>
                    </div>
                    <div className="shape-left-bottom">
                      <svg
                        fill="none"
                        style={{
                          width: "5px",
                          height: "5px",
                          stroke: "#f6f4f4",
                        }}
                        viewBox="0 0 11 11"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 1.54972e-06L0 0L2.38419e-07 11C1.65973e-07 4.92487 4.92487 1.62217e-06 11 1.54972e-06Z"
                          fill="#ffffff"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8 col-12 padding-t pt-3 pb-md-0 pb-lg-0 ps-lg-4 ps-md-4 ps-3 pb-3 d-flex flex-column justify-content-start">
                <div className="ps-lg-4 ps-md-4 ps-0">
                  <div className="text-small mb-2">
                    Coworking Space in Gurugram
                  </div>
                  <div className="h5 mb-0">Springboard Golf Course Road</div>
                  <div className="text-small mb-2">
                    Plot No 1, Golf Course Road
                  </div>
                </div>
                <div className="bottom-right">
                  <Link className="details-link" href="#">
                    DETAILS
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ----- DLF Phase 5 Property ----- */}
          <div className="col-md-12 pt-3" id="DLF Phase 5">
            <div className="loaction-tab">
              <a href="#">DLF Phase 5</a>
            </div>
          </div>
          <div className="col-md-6 back pe-4 mb-4">
            <div className="row">
              <div className="col-md-4 col-lg-4 col-12 position-relative p-0">
                <div className="image-slider1">
                  <div>
                    <img
                      alt="Property Image"
                      className="img-fluid w-100"
                      src="/assets/locationproperty/locationproperty/1747999654_Managed office.jpg"
                    />
                  </div>
                  <div>
                    <img
                      alt="Property Image"
                      className="img-fluid w-100"
                      src="/assets/locationproperty/locationproperty/1747999118_meeting rooms (1).png"
                    />
                  </div>
                  <div>
                    <img
                      alt="Property Image"
                      className="img-fluid w-100"
                      src="/assets/locationproperty/locationproperty/1748004493_Coworking.png"
                    />
                  </div>
                </div>
                <div className="service-img1 service-img2">
                  <div className="shape-bottom-right"></div>
                </div>
              </div>
              <div className="col-md-8 col-12 padding-t pt-3 pb-md-0 pb-lg-0 ps-lg-4 ps-md-4 ps-3 pb-3 d-flex flex-column justify-content-start">
                <div className="ps-lg-4 ps-md-4 ps-0">
                  <div className="text-small mb-2">Coworking Space in DLF</div>
                  <div className="h5 mb-0">Springboard DLF Phase 5</div>
                  <div className="text-small mb-2">
                    Plot No 530, DLF Phase 5
                  </div>
                </div>
                <div className="bottom-right">
                  <Link className="details-link" href="#">
                    DETAILS
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
