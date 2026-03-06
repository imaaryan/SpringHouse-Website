"use client";

import { useEffect } from "react";

export default function SolutionsMobile() {
  useEffect(() => {
    let intervalId;
    const initSlider = () => {
      if (
        typeof window !== "undefined" &&
        window.$ &&
        window.$.fn.owlCarousel
      ) {
        if (!window.$(".owl-sec").hasClass("owl-loaded")) {
          window.$(".owl-sec").owlCarousel({
            loop: true,
            animateOut: "fadeOut",
            animateIn: "fadeIn",
            margin: 20,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 4000,
            responsive: {
              0: { items: 1 },
              576: { items: 1 },
              768: { items: 2 },
              992: { items: 3 },
            },
          });
        }
        clearInterval(intervalId);
      }
    };
    intervalId = setInterval(initSlider, 100);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="service-section d-lg-none d-md-none d-block">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 pb-3">
            <span className="section-title-span">Solutions</span>
          </div>
        </div>
        <div className="owl-carousel owl-sec owl-theme">
          {/* Card 1 */}
          <div className="col-lg-4 co-md-6 col-sm-6 mb-2">
            <div className="service-card relative">
              <div className="service-img">
                <img
                  src="/assets/bannerimage/1747035219_home-banner.jpg"
                  alt="co work spaces – SpringHouse coworking office view"
                />
                <div className="shape-bottom">
                  <div className="shape-left-top">
                    <svg
                      viewBox="0 0 11 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-11 h-11"
                      style={{
                        width: "1.0rem",
                        height: "1.0rem",
                        stroke: "#f5f3f3",
                      }}
                    >
                      <path
                        d="M11 1.54972e-06L0 0L2.38419e-07 11C1.65973e-07 4.92487 4.92487 1.62217e-06 11 1.54972e-06Z"
                        fill="#f5f3f3"
                      ></path>
                    </svg>
                  </div>
                  <div className="shape-right-bottom">
                    <svg
                      viewBox="0 0 11 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-11 h-11"
                      style={{
                        width: "1.0rem",
                        height: "1.0rem",
                        stroke: "#f5f3f3",
                      }}
                    >
                      <path
                        d="M11 1.54972e-06L0 0L2.38419e-07 11C1.65973e-07 4.92487 4.92487 1.62217e-06 11 1.54972e-06Z"
                        fill="#0e0f11"
                        style={{ fill: "#f5f3f3" }}
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="service-head">
                  <h4 className="font24">Managed Office</h4>
                </div>
              </div>

              <div className="service-content">
                <div className="service-para s-p mb-3">
                  <p>
                    Experience a fully serviced private office at SpringHouse,
                    designed exclusively for your company. Our comprehensive
                    service package covers utilities, maintenance, cleaning,
                    security, and operational support, ensuring a hassle-free
                    workspace.
                  </p>
                </div>
                <div className="service-btn mt-2">
                  <a href="managed-office" className="textright morebtn font17">
                    More Details
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-lg-4 co-md-6 col-sm-6 mb-2">
            <div className="service-card relative">
              <div className="service-img">
                <img
                  src="/assets/officedetails/1747049596_j1.png"
                  alt="co work spaces – SpringHouse coworking office view"
                />
                <div className="shape-bottom">
                  <div className="shape-left-top">
                    <svg
                      viewBox="0 0 11 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-11 h-11"
                      style={{
                        width: "1.0rem",
                        height: "1.0rem",
                        stroke: "#f5f3f3",
                      }}
                    >
                      <path
                        d="M11 1.54972e-06L0 0L2.38419e-07 11C1.65973e-07 4.92487 4.92487 1.62217e-06 11 1.54972e-06Z"
                        fill="#f5f3f3"
                      ></path>
                    </svg>
                  </div>
                  <div className="shape-right-bottom">
                    <svg
                      viewBox="0 0 11 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-11 h-11"
                      style={{
                        width: "1.0rem",
                        height: "1.0rem",
                        stroke: "#f5f3f3",
                      }}
                    >
                      <path
                        d="M11 1.54972e-06L0 0L2.38419e-07 11C1.65973e-07 4.92487 4.92487 1.62217e-06 11 1.54972e-06Z"
                        fill="#0e0f11"
                        style={{ fill: "#f5f3f3" }}
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="service-head">
                  <h4 className="font24">Virtual Office</h4>
                </div>
              </div>

              <div className="service-content">
                <div className="service-para s-p mb-3">
                  <p>
                    Establish a professional business presence with our virtual
                    office solutions, including GST registration, mail handling,
                    and company incorporation services. Perfect for startups and
                    businesses...
                  </p>
                </div>
                <div className="service-btn mt-2">
                  <a href="virtual-office" className="textright morebtn font17">
                    More Details
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-lg-4 co-md-6 col-sm-6 mb-2">
            <div className="service-card relative">
              <div className="service-img">
                <img
                  src="/assets/officedetails/1747049618_j2.png"
                  alt="co work spaces – SpringHouse coworking office view"
                />
                <div className="shape-bottom">
                  <div className="shape-left-top">
                    <svg
                      viewBox="0 0 11 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-11 h-11"
                      style={{
                        width: "1.0rem",
                        height: "1.0rem",
                        stroke: "#f5f3f3",
                      }}
                    >
                      <path
                        d="M11 1.54972e-06L0 0L2.38419e-07 11C1.65973e-07 4.92487 4.92487 1.62217e-06 11 1.54972e-06Z"
                        fill="#f5f3f3"
                      ></path>
                    </svg>
                  </div>
                  <div className="shape-right-bottom">
                    <svg
                      viewBox="0 0 11 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-11 h-11"
                      style={{
                        width: "1.0rem",
                        height: "1.0rem",
                        stroke: "#f5f3f3",
                      }}
                    >
                      <path
                        d="M11 1.54972e-06L0 0L2.38419e-07 11C1.65973e-07 4.92487 4.92487 1.62217e-06 11 1.54972e-06Z"
                        fill="#0e0f11"
                        style={{ fill: "#f5f3f3" }}
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="service-head">
                  <h4 className="font24">Coworking</h4>
                </div>
              </div>

              <div className="service-content">
                <div className="service-para s-p mb-3">
                  <p>
                    Whether you need an open desk for collaboration or a private
                    space for focus, our coworking solutions offer flexibility
                    for freelancers, startups, and teams. Customize your setup,
                    work alongside a dynamic community, and enjoy a workspace
                    designed to reflect your brand and culture....
                  </p>
                </div>
                <div className="service-btn mt-2">
                  <a href="coworking" className="textright morebtn font17">
                    More Details
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="col-lg-4 co-md-6 col-sm-6 mb-2">
            <div className="service-card relative">
              <div className="service-img">
                <img
                  src="/assets/officedetails/1747049687_j5.png"
                  alt="co work spaces – SpringHouse coworking office view"
                />
                <div className="shape-bottom">
                  <div className="shape-left-top">
                    <svg
                      viewBox="0 0 11 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-11 h-11"
                      style={{
                        width: "1.0rem",
                        height: "1.0rem",
                        stroke: "#f5f3f3",
                      }}
                    >
                      <path
                        d="M11 1.54972e-06L0 0L2.38419e-07 11C1.65973e-07 4.92487 4.92487 1.62217e-06 11 1.54972e-06Z"
                        fill="#f5f3f3"
                      ></path>
                    </svg>
                  </div>
                  <div className="shape-right-bottom">
                    <svg
                      viewBox="0 0 11 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-11 h-11"
                      style={{
                        width: "1.0rem",
                        height: "1.0rem",
                        stroke: "#f5f3f3",
                      }}
                    >
                      <path
                        d="M11 1.54972e-06L0 0L2.38419e-07 11C1.65973e-07 4.92487 4.92487 1.62217e-06 11 1.54972e-06Z"
                        fill="#0e0f11"
                        style={{ fill: "#f5f3f3" }}
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="service-head">
                  <h4 className="font24">Day Pass</h4>
                </div>
              </div>

              <div className="service-content">
                <div className="service-para s-p mb-3">
                  <p>
                    Get full office access for a day at any SpringHouse
                    coworking space near you. Enjoy high-speed internet,
                    printing, and flexible seating in a secure and collaborative
                    environment designed for productivity....
                  </p>
                </div>
                <div className="service-btn mt-2">
                  <a href="day-pass" className="textright morebtn font17">
                    More Details
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="col-lg-4 co-md-6 col-sm-6 mb-2">
            <div className="service-card relative">
              <div className="service-img">
                <img
                  src="/assets/officedetails/1747049638_j3.png"
                  alt="co work spaces – SpringHouse coworking office view"
                />
                <div className="shape-bottom">
                  <div className="shape-left-top">
                    <svg
                      viewBox="0 0 11 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-11 h-11"
                      style={{
                        width: "1.0rem",
                        height: "1.0rem",
                        stroke: "#f5f3f3",
                      }}
                    >
                      <path
                        d="M11 1.54972e-06L0 0L2.38419e-07 11C1.65973e-07 4.92487 4.92487 1.62217e-06 11 1.54972e-06Z"
                        fill="#f5f3f3"
                      ></path>
                    </svg>
                  </div>
                  <div className="shape-right-bottom">
                    <svg
                      viewBox="0 0 11 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-11 h-11"
                      style={{
                        width: "1.0rem",
                        height: "1.0rem",
                        stroke: "#f5f3f3",
                      }}
                    >
                      <path
                        d="M11 1.54972e-06L0 0L2.38419e-07 11C1.65973e-07 4.92487 4.92487 1.62217e-06 11 1.54972e-06Z"
                        fill="#0e0f11"
                        style={{ fill: "#f5f3f3" }}
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="service-head">
                  <h4 className="font24">Meeting Room</h4>
                </div>
              </div>

              <div className="service-content">
                <div className="service-para s-p mb-3">
                  <p>
                    Need a conference room rental? Our meeting rooms are
                    designed for client presentations, team discussions, and
                    brainstorming sessions. Book a conference room on rent that
                    ensures privacy, productivity, and seamless collaboration...
                  </p>
                </div>
                <div className="service-btn mt-2">
                  <a href="meeting-rooms" className="textright morebtn font17">
                    More Details
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Card 6 */}
          <div className="col-lg-4 co-md-6 col-sm-6 mb-2">
            <div className="service-card relative">
              <div className="service-img">
                <img
                  src="/assets/officedetails/1747049663_j4.png"
                  alt="co work spaces – SpringHouse coworking office view"
                />
                <div className="shape-bottom">
                  <div className="shape-left-top">
                    <svg
                      viewBox="0 0 11 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-11 h-11"
                      style={{
                        width: "1.0rem",
                        height: "1.0rem",
                        stroke: "#f5f3f3",
                      }}
                    >
                      <path
                        d="M11 1.54972e-06L0 0L2.38419e-07 11C1.65973e-07 4.92487 4.92487 1.62217e-06 11 1.54972e-06Z"
                        fill="#f5f3f3"
                      ></path>
                    </svg>
                  </div>
                  <div className="shape-right-bottom">
                    <svg
                      viewBox="0 0 11 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-11 h-11"
                      style={{
                        width: "1.0rem",
                        height: "1.0rem",
                        stroke: "#f5f3f3",
                      }}
                    >
                      <path
                        d="M11 1.54972e-06L0 0L2.38419e-07 11C1.65973e-07 4.92487 4.92487 1.62217e-06 11 1.54972e-06Z"
                        fill="#0e0f11"
                        style={{ fill: "#f5f3f3" }}
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="service-head">
                  <h4 className="font24">Event Space</h4>
                </div>
              </div>

              <div className="service-content">
                <div className="service-para s-p mb-3">
                  <p>
                    Our event spaces are ideal for product launches, networking
                    meet-ups, and workshops. Fully equipped and available for
                    event space rental, whether for a private gathering or a
                    public event...
                  </p>
                </div>
                <div className="service-btn mt-2">
                  <a href="#" className="textright morebtn font17">
                    More Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
