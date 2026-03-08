import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function LocationHero({ location = "gurugram" }) {
  // We can pass data as props later, hardcoding Gurgaon for now as requested
  return (
    <div className="loctions specific-location" data-aos="fade-up">
      <div className="container-fluid">
        <div className="row pt30">
          <div className="col-lg-12 mb-4">
            <div className="locationscard relative">
              <div className="locations-image">
                <img
                  alt="co work spaces – SpringHouse coworking office view"
                  src="/assets/locationdetail/banner/1747118432_gurugram.jpg"
                />
                <div className="shape-bottom">
                  <div className="shape-left-top">
                    <svg
                      className="w-11 h-11"
                      fill="none"
                      style={{
                        width: "1.0rem",
                        height: "1.0rem",
                        stroke: "#ffffff",
                      }}
                      viewBox="0 0 11 11"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 1.54972e-06L0 0L2.38419e-07 11C1.65973e-07 4.92487 4.92487 1.62217e-06 11 1.54972e-06Z"
                        fill="#fff"
                      ></path>
                    </svg>
                  </div>
                  <div className="shape-right-bottom">
                    <svg
                      className="w-11 h-11"
                      fill="none"
                      style={{
                        width: "1.0rem",
                        height: "1.0rem",
                        stroke: "#ffffff",
                      }}
                      viewBox="0 0 11 11"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 1.54972e-06L0 0L2.38419e-07 11C1.65973e-07 4.92487 4.92487 1.62217e-06 11 1.54972e-06Z"
                        fill="#0e0f11"
                        style={{ fill: "#ffffff" }}
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="location-content">
                <h4 className="section-title">
                  gurugram
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
