"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Footer() {
  return (
    <>
      <footer className="relative">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-7 pe-5">
              <div className="row">
                <div className="col-md-3 mb-lg-0 mb-md-0 mb-4">
                  <div className="widgt">
                    <h3>company</h3>
                    <ul className="footer-link">
                      <li>
                        <Link href="#">Blogs</Link>
                      </li>
                      <li>
                        <Link href="#">Policies</Link>
                      </li>
                      <li>
                        <Link href="#">FAQ's</Link>
                      </li>
                      <li>
                        <Link href="#">Careers</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-3 mb-lg-0 mb-md-0 mb-4">
                  <div className="widgt">
                    <h3>locations</h3>
                    <ul className="footer-link">
                      <li>
                        <Link href="#">Gurugram</Link>
                      </li>
                      <li>
                        <Link href="#">Delhi</Link>
                      </li>
                      <li>
                        <Link href="#">Noida</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-3 mb-lg-0 mb-md-0">
                  <div className="widgt">
                    <h3>solutions</h3>
                    <ul className="footer-link">
                      <li>
                        <Link href="#">Managed Office</Link>
                      </li>
                      <li>
                        <Link href="#">Virtual Office</Link>
                      </li>
                      <li>
                        <Link href="#">Coworking</Link>
                      </li>
                      <li>
                        <Link href="#">Day Pass</Link>
                      </li>
                      <li>
                        <Link href="#">Meeting Rooms</Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="footer-content pt-5">
                    <div className="footer-head">
                      <p className="font12">Discover Coworking Space:</p>
                    </div>
                    <div className="footer-links">
                      <Link href="#">co working</Link>
                      <Link href="#">coworking space near me</Link>
                      <Link href="#">coworking space in gurugram</Link>
                      <Link href="#">coworking space in noida</Link>
                      <Link href="#">coworking cafe</Link>
                      <Link href="#">my workspace</Link>
                      <Link href="#">working hubs</Link>
                      <Link href="#">my workspace</Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="footer-content">
                    <div className="footer-head">
                      <p className="font12">
                        Office Solutions & Flex Workspaces
                      </p>
                    </div>
                    <div className="footer-links">
                      <Link href="#">managed office</Link>
                      <Link href="#">office space</Link>
                      <Link href="#">office spaces near me</Link>
                      <Link href="#">conference room</Link>
                      <Link href="#">office space for rent</Link>
                      <Link href="#">office space to let</Link>
                      <Link href="#">virtual space</Link>
                      <Link href="#">offices to rent near me</Link>
                      <Link href="#">working space near me</Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="footer-content">
                    <div className="footer-head">
                      <p className="font12">Events & Meeting Spaces</p>
                    </div>
                    <div className="footer-links">
                      <Link href="#">event space rental</Link>
                      <Link href="#">event venues near me</Link>
                      <Link href="#">event hall</Link>
                      <Link href="#">event rooms</Link>
                      <Link href="#">conference room rental</Link>
                      <Link href="#">conference venues near me</Link>
                      <Link href="#">conference hall</Link>
                      <Link href="#">conference room on rent</Link>
                      <Link href="#">conference hall near me</Link>
                      <Link href="#">conference room meeting</Link>
                      <Link href="#">conference meeting</Link>
                      <Link href="#">company coworking</Link>
                      <Link href="#">meeting room in office</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 ps-4">
              <div className="footer-follow">
                <div className="footer-box">
                  <div className="follow-head">
                    <p className="font20">Follow us</p>
                  </div>
                  <div className="follow-social-link mt-3">
                    <a
                      href="https://www.instagram.com/springhouse.workspaces/"
                      className="insta"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className="actule"
                        src="/frontend_assets/img/insta-hover.png"
                        alt="working space – SpringHouse coworking office view"
                      />
                      <img
                        className="black-i"
                        src="/frontend_assets/img/Instagram.png"
                        alt="rent a coworking space – SpringHouse coworking office view"
                      />
                    </a>

                    <a
                      href="https://www.facebook.com/SpringhouseCoworking"
                      className="face"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className="actule"
                        src="/frontend_assets/img/fb-hover.png"
                        alt="working space – SpringHouse coworking office view"
                      />
                      <img
                        className="black-i"
                        src="/frontend_assets/img/Facebook.png"
                        alt="working space – SpringHouse coworking office view"
                      />
                    </a>

                    <a
                      href="https://www.linkedin.com/company/spring-house-coworking/"
                      className="link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className="actule"
                        src="/frontend_assets/img/linkedin-hover.png"
                        alt="working space – SpringHouse coworking office view"
                      />
                      <img
                        className="black-i"
                        src="/frontend_assets/img/LinkedIn.png"
                        alt="coworking spaces – SpringHouse coworking office view"
                      />
                    </a>
                  </div>
                </div>
                <div className="footer-box">
                  <div className="follow-head">
                    <p className="font20">Head quarters</p>
                  </div>
                  <div className="follow-address">
                    <p className="text-white">
                      LG 006, DLF Grand Mall, MG Rd, <br />
                      Gurugram, Haryana 122001
                    </p>
                  </div>
                </div>
                <div className="footer-box">
                  <div className="follow-head">
                    <p className="font20">CONTACT US</p>
                  </div>
                  <div className="follow-address">
                    <a href="tel:+919899936669">
                      <p>
                        <i
                          className="fa fa-phone"
                          style={{ fontFamily: "'FontAwesome'" }}
                        ></i>{" "}
                        +91-9899936669
                      </p>
                    </a>
                    <a
                      href="https://api.whatsapp.com/send?phone=917428573675"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p>
                        <i
                          className="fa fa-whatsapp"
                          style={{ fontFamily: "'FontAwesome'" }}
                        ></i>{" "}
                        +91 74285 73675
                      </p>
                    </a>
                    <a href="mailto:springup@springhouse.in">
                      <p>springup@springhouse.in</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <a
        href="https://api.whatsapp.com/send?phone=917428573675"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp"
      >
        <i className="fab fa-whatsapp"></i>
      </a>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .whatsapp {
            background-color: #25D366;
            border-radius: 50%;
            position: fixed !important;
            bottom: 20px;
            font-size: 30px;
            color: #fff !important;
            opacity: 1 !important;
            z-index: 9;
            right: 15px;
            width: 50px;
            height: 50px;
            text-align: center;
            line-height: 55px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
        }
        .whatsapp i {
            font-size: 35px;
        }
        .footer-links a {
            font-size: 12px;
            color: var(--theme-whitecolor);
            font-family: var(--theme-mainpara);
            font-weight: 400;
            position: relative;
            padding: 0px 8px;
            text-wrap-mode: nowrap;
            white-space: nowrap;
            text-decoration: none;
        }
        .footer-links {
            display: flex;
            flex-wrap: wrap;
            row-gap: 8px;
        }
        .footer-links a::after {
            content: "";
            position: absolute;
            right: 0px;
            top: 52%;
            transform: translateY(-45%);
            width: 1px;
            height: 53%;
            border-right: 1px solid var(--theme-whitecolor);
        }
        .footer-links.pt30 {
            margin-left: -8px;
        }
      `,
        }}
      />
    </>
  );
}
