"use client";

import { useEffect } from "react";

export default function PresenceCounter() {
  useEffect(() => {
    const counters = document.querySelectorAll(".counter");

    const startCounting = (el) => {
      const targetStr = el.innerText || el.textContent;
      // Extract only numeric value, removing "K" or "+"
      const targetNum = parseInt(targetStr.replace(/[^0-9]/g, "")) || 0;
      let count = 0;
      const duration = 2000; // 2 seconds
      const increment = targetNum / (duration / 16); // 60fps

      const updateCount = () => {
        count += increment;
        if (count < targetNum) {
          el.innerText = Math.ceil(count);
          requestAnimationFrame(updateCount);
        } else {
          el.innerText = targetNum;
        }
      };

      updateCount();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!entry.target.classList.contains("counter-loaded")) {
              entry.target.classList.add("counter-loaded");
              startCounting(entry.target);
            }
          }
        });
      },
      { threshold: 0.5 },
    );

    counters.forEach((counter) => {
      observer.observe(counter);
    });

    return () => {
      counters.forEach((counter) => observer.unobserve(counter));
    };
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
