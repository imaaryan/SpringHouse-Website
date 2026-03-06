"use client";

import { useEffect, useRef } from "react";

export default function Testimonials() {
  const sliderRef = useRef(null);

  useEffect(() => {
    let intervalId;
    const initSlider = () => {
      if (typeof window !== "undefined" && window.$ && window.$.fn.slick) {
        const $slider = window.$(".testimonial-slider-init");

        if (!$slider.hasClass("slick-initialized")) {
          $slider.slick({
            arrows: true,
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            adaptiveHeight: true,
            prevArrow: "<i class='fa fa-chevron-left'></i>",
            nextArrow: "<i class='fa fa-chevron-right'></i>",
          });
        }
        clearInterval(intervalId);
      }
    };
    intervalId = setInterval(initSlider, 100);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="testimonials ptb60">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <span className="section-title-span">testimonials</span>
          </div>
        </div>
        <div className="testimonial-slider-init pt30">
          <div>
            <div className="testimonial-card">
              <div className="row d-flex align-items-center justify-content-center">
                <div className="col-lg-3">
                  <div className="testimonial-img relative">
                    <div className="testimonial-client-img">
                      <img
                        src="/assets/ourtestimonials/1750408067_SalarySe (2).png"
                        alt="rent a coworking space – SpringHouse coworking office view"
                      />
                    </div>
                    <div className="testimonial-spring absolute">
                      <img
                        src="/frontend_assets/img/spring.png"
                        alt="rent a coworking space – SpringHouse coworking office view"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="testimonial-content relative">
                    <div className="testimonial-quote absolute">
                      <img
                        src="/frontend_assets/img/quote.png"
                        alt="working space – SpringHouse coworking office view"
                      />
                    </div>
                    <div className="testimonial-para pe-lg-5 pe-0">
                      <div className="font32">
                        <p>
                          Spring House has been a constant. It's become such a
                          seamless part of our operations that we rarely have to
                          think about it. That's what Spring House has been for
                          us.
                        </p>
                      </div>
                    </div>
                    <div className="testimonial-name">
                      <p className="font19 textright">
                        ~ Saumeet Nanda <br />
                        Co-Founder, SalarySe
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="testimonial-card">
              <div className="row d-flex align-items-center justify-content-center">
                <div className="col-lg-3">
                  <div className="testimonial-img relative">
                    <div className="testimonial-client-img">
                      <img
                        src="/assets/ourtestimonials/1750407970_RapidShyp.png"
                        alt="rent a coworking space – SpringHouse coworking office view"
                      />
                    </div>
                    <div className="testimonial-spring absolute">
                      <img
                        src="/frontend_assets/img/spring.png"
                        alt="rent a coworking space – SpringHouse coworking office view"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="testimonial-content relative">
                    <div className="testimonial-quote absolute">
                      <img
                        src="/frontend_assets/img/quote.png"
                        alt="working space – SpringHouse coworking office view"
                      />
                    </div>
                    <div className="testimonial-para pe-lg-5 pe-0">
                      <div className="font32">
                        <p>
                          From facility and pantry management to cleanliness and
                          daily operations, the Spring House team ensures we can
                          focus entirely on our work. It's a smooth,
                          plug-and-play experience—no operational headaches.
                        </p>
                      </div>
                    </div>
                    <div className="testimonial-name">
                      <p className="font19 textright">
                        ~ Parul Rao <br />
                        Senior Manager HR - Rapidshyp
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="testimonial-card">
              <div className="row d-flex align-items-center justify-content-center">
                <div className="col-lg-3">
                  <div className="testimonial-img relative">
                    <div className="testimonial-client-img">
                      <img
                        src="/assets/ourtestimonials/1750674961_Uunique.png"
                        alt="rent a coworking space – SpringHouse coworking office view"
                      />
                    </div>
                    <div className="testimonial-spring absolute">
                      <img
                        src="/frontend_assets/img/spring.png"
                        alt="rent a coworking space – SpringHouse coworking office view"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="testimonial-content relative">
                    <div className="testimonial-quote absolute">
                      <img
                        src="/frontend_assets/img/quote.png"
                        alt="working space – SpringHouse coworking office view"
                      />
                    </div>
                    <div className="testimonial-para pe-lg-5 pe-0">
                      <div className="font32">
                        <p>
                          I needed a space that would speak to my brand's ethos
                          and make a strong impression on our Japanese clients.
                          Spring House solved that challenge completely.
                          Everything was handled—all under one roof with a
                          single invoice.
                        </p>
                      </div>
                    </div>
                    <div className="testimonial-name">
                      <p className="font19 textright">
                        ~ Kailash Singh <br />
                        Co-Founder, Uunique Consulting
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="testimonial-card">
              <div className="row d-flex align-items-center justify-content-center">
                <div className="col-lg-3">
                  <div className="testimonial-img relative">
                    <div className="testimonial-client-img">
                      <img
                        src="/assets/ourtestimonials/1750674810_AdYogi.png"
                        alt="rent a coworking space – SpringHouse coworking office view"
                      />
                    </div>
                    <div className="testimonial-spring absolute">
                      <img
                        src="/frontend_assets/img/spring.png"
                        alt="rent a coworking space – SpringHouse coworking office view"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="testimonial-content relative">
                    <div className="testimonial-quote absolute">
                      <img
                        src="/frontend_assets/img/quote.png"
                        alt="working space – SpringHouse coworking office view"
                      />
                    </div>
                    <div className="testimonial-para pe-lg-5 pe-0">
                      <div className="font32">
                        <p>
                          As far as enhancing work-life balance goes, Spring
                          House has always made it easier for us.
                        </p>
                      </div>
                    </div>
                    <div className="testimonial-name">
                      <p className="font19 textright">
                        ~ Swati Abrol <br />
                        HRBP, AdYogi
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="testimonial-card">
              <div className="row d-flex align-items-center justify-content-center">
                <div className="col-lg-3">
                  <div className="testimonial-img relative">
                    <div className="testimonial-client-img">
                      <img
                        src="/assets/ourtestimonials/1750675039_Cars24.png"
                        alt="rent a coworking space – SpringHouse coworking office view"
                      />
                    </div>
                    <div className="testimonial-spring absolute">
                      <img
                        src="/frontend_assets/img/spring.png"
                        alt="rent a coworking space – SpringHouse coworking office view"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="testimonial-content relative">
                    <div className="testimonial-quote absolute">
                      <img
                        src="/frontend_assets/img/quote.png"
                        alt="working space – SpringHouse coworking office view"
                      />
                    </div>
                    <div className="testimonial-para pe-lg-5 pe-0">
                      <div className="font32">
                        <p>
                          Ideas are coming from everywhere , so that's very
                          fascinating to see.
                        </p>
                      </div>
                    </div>
                    <div className="testimonial-name">
                      <p className="font19 textright">
                        ~ Arindam Mandal <br />
                        Senior Program Manager, Cars24
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .testimonials .fa.fa-chevron-right {
            font-size: 26px;
            color: #6c6c6c;
            position: absolute;
            right: 30px;
            top: 50%;
            cursor: pointer;
            z-index: 9;
            transform: translateY(-50%);
        }
        .testimonials .fa.fa-chevron-left {
            font-size: 26px;
            color: #fff;
            position: absolute;
            z-index: 9;
            left: 30px;
            top: 50%;
            cursor: pointer;
            transform: translateY(-50%);
        }
        .testimonials .slick-dots li {
            position: relative;
            display: inline-block;
            margin: 0 4px;
            padding: 0;
            cursor: pointer;
            background: #000000;
            border-radius: 50px;
            width: 8px;
            height: 8px;
        }
        .testimonials .slick-dots .slick-active {
            background: transparent;
            border: 1px solid #161616;
            width: 8px;
            height: 8px;
        }
        .testimonials .slick-dots {
            display: flex;
            justify-content: center;
            list-style: none;
            padding-top: 20px;
        }
        .testimonials .slick-dots button {
            display: none;
        }
      `,
        }}
      />
    </div>
  );
}
