"use client";

import { useEffect } from "react";

export default function Blogs() {
  useEffect(() => {
    let intervalId;
    const initSlider = () => {
      if (
        typeof window !== "undefined" &&
        window.$ &&
        window.$.fn.owlCarousel
      ) {
        if (!window.$(".blog-carousel").hasClass("owl-loaded")) {
          window.$(".blog-carousel").owlCarousel({
            loop: true,
            margin: 30,
            nav: false,
            dots: true,
            autoplay: false,
            autoplayTimeout: 4000,
            responsive: {
              0: {
                items: 1,
                autoplay: true,
              },
              768: {
                items: 2,
              },
              992: {
                items: 3,
              },
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
    <div className="blogs">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <span className="section-title-span">blogs</span>
          </div>
        </div>
        <div className="owl-carousel blog-carousel owl-theme pt30">
          <div className="item">
            <div className="col-lg-12">
              <a href="#">
                <div className="blog-card">
                  <div className="blog-image relative">
                    <img src="/assets/blogs/1748253643_1.png" alt="" />
                  </div>
                  <div className="blog-content text-shape relative">
                    <div className="blog-para">
                      <p>
                        How Spring House Can Help You Find the Ideal Coworking
                        Space for Your Company
                      </p>
                    </div>
                    <div className="blog-date textright">
                      <span className="font17 textright">May 22, 2025</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div className="item">
            <div className="col-lg-12">
              <a href="#">
                <div className="blog-card">
                  <div className="blog-image relative">
                    <img src="/assets/blogs/1748254055_2.png" alt="" />
                  </div>
                  <div className="blog-content text-shape relative">
                    <div className="blog-para">
                      <p>
                        How Coworking Spaces Are Shaping the Future of Work
                        Culture
                      </p>
                    </div>
                    <div className="blog-date textright">
                      <span className="font17 textright">May 22, 2025</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div className="item">
            <div className="col-lg-12">
              <a href="#">
                <div className="blog-card">
                  <div className="blog-image relative">
                    <img src="/assets/blogs/1748254622_3.png" alt="" />
                  </div>
                  <div className="blog-content text-shape relative">
                    <div className="blog-para">
                      <p>
                        Best Budget-Friendly Offices in Gurgaon, Delhi, and
                        Noida
                      </p>
                    </div>
                    <div className="blog-date textright">
                      <span className="font17 textright">May 22, 2025</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .blog-card .shape-bottom {
            position: absolute;
            bottom: -20px;
            left: 0;
            background: var(--theme-whitecolor);
            width: 200px;
            height: 97px;
            border-radius: 0 20px 0 0;
        }

        .blog-card .shape-right-bottom {
            position: absolute;
            right: -14px;
            bottom: 16px;
        }

        .blog-image img {
            border-bottom-right-radius: 10px;
        }

        .blog-date.textright {
            margin-top: 25px;
            color: #575757;
        }
      `,
        }}
      />
    </div>
  );
}
