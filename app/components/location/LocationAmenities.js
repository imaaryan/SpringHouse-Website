import React from "react";
import Image from "next/image";

export default function LocationAmenities() {
  return (
    <section className="specfic-prop amenities pt60">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <span className="section-title-span">AMENITIES</span>
          </div>
        </div>
        <div className="row line pe-3 ps-lg-3 ps-md-3 ps-0">
          <div className="col-md-3 col-6 mb-5">
            <div className="icon-amen text-center">
              <img
                src="/assets/amenities/wifi.png"
                className="img-fluid mb-2"
                alt="wifi"
                width={80}
                height={80}
              />
              <a href="#">High Speed Wifi</a>
            </div>
          </div>
          <div className="col-md-3 col-6 mb-5">
            <div className="icon-amen text-center">
              <img
                src="/assets/amenities/cafeteria.png"
                className="img-fluid mb-2"
                alt="coffee"
                width={80}
                height={80}
              />
              <a href="#">Tea & Coffee</a>
            </div>
          </div>
          <div className="col-md-3 col-6 mb-5">
            <div className="icon-amen text-center">
              <img
                src="/assets/amenities/printer.png"
                className="img-fluid mb-2"
                alt="print"
                width={80}
                height={80}
              />
              <a href="#">Printing Setup</a>
            </div>
          </div>
          <div className="col-md-3 col-6 mb-5">
            <div className="icon-amen text-center">
              <img
                src="/assets/amenities/Security.png"
                className="img-fluid mb-2"
                alt="security"
                width={80}
                height={80}
              />
              <a href="#">24x7 Security</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
