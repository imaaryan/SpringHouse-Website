"use client";

import React, { useState } from "react";

export default function AboutTimeline() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className="get-touch get-touch-about pt-lg-5 pt-md-5 pt-2 pb-5">
      <div className="container-fluid">
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-lg-12 mt-3 mt-lg-0 mt-md-0">
            <div className="timeline-p">
              <div className="timeline-wrapper">
                <div className="timeline-nav">
                  <button
                    onClick={() => setActiveSlide(0)}
                    className={activeSlide === 0 ? "active" : ""}
                  >
                    2015
                  </button>

                  <button
                    onClick={() => setActiveSlide(1)}
                    className={activeSlide === 1 ? "active" : ""}
                  >
                    2017-19
                  </button>

                  <button
                    onClick={() => setActiveSlide(2)}
                    className={activeSlide === 2 ? "active" : ""}
                  >
                    2020
                  </button>

                  <button
                    onClick={() => setActiveSlide(3)}
                    className={activeSlide === 3 ? "active" : ""}
                  >
                    2021-23
                  </button>

                  <button
                    onClick={() => setActiveSlide(4)}
                    className={activeSlide === 4 ? "active" : ""}
                  >
                    2024
                  </button>

                  <button
                    onClick={() => setActiveSlide(5)}
                    className={activeSlide === 5 ? "active" : ""}
                  >
                    2025
                  </button>

                  <button
                    onClick={() => setActiveSlide(6)}
                    className={activeSlide === 6 ? "active" : ""}
                  >
                    2026
                  </button>
                </div>
                <div className="timeline-content">
                  <div className="timeline-content">
                    {activeSlide === 0 && (
                      <div className="timeline-slide">
                        <h2>2015</h2>
                        <p>
                          Spring House Coworking was founded, launching its
                          first 60-seater coworking space in Gurugram. The first
                          centre came to life inside a 5,000 sq. ft. villa —
                          built out with refurbished materials, second-hand
                          furniture, and a lot of late nights! There was no
                          blueprint, just a big idea and a team willing to
                          figure things out as they went.
                        </p>
                      </div>
                    )}

                    {activeSlide === 1 && (
                      <div className="timeline-slide">
                        <h2>2017-19</h2>
                        <p>
                          We moved into our first corporate-style space at Well
                          Done Tech Park — 5,300+ sq. ft. with 110+
                          workstations, proper meeting rooms, actual desks, and
                          a coffee machine that never rested. P.S. We were
                          brewing 350+ cups a day. Mostly strong. By April 2019,
                          Spring House had 2,00,000 sq. ft. of workspace across
                          NCR. In August, we launched our 30,000 sq. ft.
                          flagship at Grand Mall, MG Road — a 500+ seater
                          buzzing with freelancers, startups, teams… and a few
                          dogs.That’s when it really started to feel big.
                        </p>
                      </div>
                    )}

                    {activeSlide === 2 && (
                      <div className="timeline-slide">
                        <h2>2020</h2>
                        <p>
                          A black swan year for the world. The COVID outbreak
                          and lockdowns hit hard — vacancy notices came in,
                          membership dipped, and revenues fell by 50%. But we
                          got to work:- Strengthening our backend processes and
                          building operational infrastructure from the ground. -
                          Keeping the team close, motivated, and better skilled
                          for whatever was coming next Tough year. Big lessons.
                        </p>
                      </div>
                    )}

                    {activeSlide === 3 && (
                      <div className="timeline-slide">
                        <h2>2021-23</h2>
                        <p>
                          We hit reset. Focused on sustainable growth and made a
                          quiet commitment to open one centre every quarter.
                          Each space designed with more intention, less noise.
                          In 2023, we grew faster than we expected — a 161.16%
                          jump in revenue and a 125.27% rise in profit over the
                          previous year. Still the same team spirit. Just a
                          little more spreadsheet-savvy.
                        </p>
                      </div>
                    )}

                    {activeSlide === 4 && (
                      <div className="timeline-slide">
                        <h2>2024</h2>
                        <p>
                          Closed the financial year ending March 31, 2024, with
                          ₹53.6 crore in annual revenue. That’s 70% YoY growth —
                          driven by stronger demand, sharper operations, and
                          (finally) a smooth internal SOP system.
                        </p>
                      </div>
                    )}

                    {activeSlide === 5 && (
                      <div className="timeline-slide">
                        <h2>2025</h2>
                        <p>
                          We’re on track to hit ₹100 crore ARR by August. Our
                          total footprint across Delhi NCR is set to cross 1
                          million sq. ft., and we’re now serving over 15,000
                          cups of coffee every day!
                        </p>
                      </div>
                    )}

                    {activeSlide === 6 && (
                      <div className="timeline-slide">
                        <h2>2026</h2>
                        <p>
                          We step into 2026 with gratitude and clarity. This
                          year is about intentional growth - depth over speed,
                          people over numbers. Our focus is to strengthen our
                          spaces and the community that defines and drives
                          Spring House toward success.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
