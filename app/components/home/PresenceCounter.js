"use client";

import { useEffect } from "react";

export default function PresenceCounter() {
  useEffect(() => {
    let intervalId;
    if (typeof window !== "undefined") {
      intervalId = setInterval(() => {
        if (window.$ && window.$.fn.countUp) {
          if (!window.$(".counter").hasClass("counter-loaded")) {
            window.$(".counter").countUp();
            window.$(".counter").addClass("counter-loaded");
          }
          clearInterval(intervalId);
        }
      }, 100);

      // Cleanup
      return () => clearInterval(intervalId);
    }
  }, []);

  return (
    <div className="presence ptb60 pt-lg-5 pt-md-5">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <span className="section-title-span">presence</span>
          </div>
        </div>
        <div className="row pt30">
          <div className="col-lg-3 col-md-3 col-6">
            <div className="counter-box">
              <div className="counter-number">
                <span className="counter font46">25</span>
                <span className="plus font46">+</span>
              </div>
              <p className="font20">Locations</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-3 col-6">
            <div className="counter-box">
              <div className="counter-number">
                <span className="counter font46">300</span>
                <span className="plus font46">+</span>
              </div>
              <p className="font20">Organisations</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-3 col-6">
            <div className="counter-box">
              <div className="counter-number">
                <span className="counter font46">1000</span>
                <span className="plus font46">K+</span>
              </div>
              <p className="font20">Square Feet Area</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-3 col-6">
            <div className="counter-box">
              <div className="counter-number">
                <span className="counter font46">11</span>
                <span className="plus font46">+</span>
              </div>
              <p className="font20">Members</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
