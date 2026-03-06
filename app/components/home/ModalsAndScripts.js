"use client";

import { useState } from "react";
import Swal from "sweetalert2";

export default function ModalsAndScripts() {
  const [deskCount, setDeskCount] = useState(1);
  const [formData, setFormData] = useState({
    full_name: "",
    company_name: "",
    work_email: "",
    contact_number: "",
    location: "",
    property: "",
    solution: "",
  });

  const handleIncrement = () => setDeskCount((prev) => prev + 1);
  const handleDecrement = () =>
    setDeskCount((prev) => (prev > 1 ? prev - 1 : 1));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.full_name ||
      !formData.company_name ||
      !formData.work_email ||
      !formData.contact_number ||
      !formData.location ||
      !formData.solution
    ) {
      Swal.fire({
        title: "Error!",
        text: "Please fill in all required fields.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      Swal.fire({
        title: "Success!",
        text: "Your request has been submitted successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setFormData({
        full_name: "",
        company_name: "",
        work_email: "",
        contact_number: "",
        location: "",
        property: "",
        solution: "",
      });
      setDeskCount(1);

      // Close modal using Bootstrap API if it's open
      if (typeof window !== "undefined" && window.bootstrap) {
        const modalEl = document.getElementById("exampleModaltwo");
        if (modalEl) {
          const modalInstance = window.bootstrap.Modal.getInstance(modalEl);
          if (modalInstance) {
            modalInstance.hide();
          }
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="exampleModaltwo"
        tabIndex="-1"
        aria-labelledby="exampleModaltwoLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-5">
                  <div className="get-left-touch relative">
                    <div className="get-call">
                      <div className="get-call-icon relative">
                        <div className="icon-shape-circle"></div>
                        <div className="call-icon">
                          <img src="/frontend_assets/img/call.png" alt="" />
                        </div>
                      </div>
                      <div className="get-call-no">
                        <a href="tel:+919899936669">+91 9899936669</a>
                      </div>
                    </div>
                    <div className="get-image-bottom mt20 relative">
                      <div className="get-image">
                        <img
                          src="/frontend_assets/img/get-touch.png"
                          alt="rent a coworking space – SpringHouse coworking office view"
                        />
                      </div>
                      <div className="circle-arrow">
                        <div className="arrow">
                          <img
                            src="/frontend_assets/img/arrow-left1.png"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="shape-bottom-right">
                        <div className="shape-right-top">
                          <svg
                            viewBox="0 0 11 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-11 h-11"
                            style={{
                              width: "1.0rem",
                              height: "1.0rem",
                              stroke: "#ffffff",
                            }}
                          >
                            <path
                              d="M11 1.54972e-06L0 0L2.38419e-07 11C1.65973e-07 4.92487 4.92487 1.62217e-06 11 1.54972e-06Z"
                              fill="#fff"
                            ></path>
                          </svg>
                        </div>
                        <div className="shape-left-bottom">
                          <svg
                            viewBox="0 0 11 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-11 h-11"
                            style={{
                              width: "1.0rem",
                              height: "1.0rem",
                              stroke: "#ffffff",
                            }}
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
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="get-right-touch mt-4">
                    <div className="get-right-head">
                      <h2 className="font46 textcenter">
                        get in touch <span>with us</span>
                      </h2>
                    </div>
                    <div className="get-right-form-design mt20">
                      <form id="locatisonForm" onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <input
                            type="text"
                            name="full_name"
                            className="form-control"
                            placeholder="Full Name"
                            value={formData.full_name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="row">
                          <div className="col-lg-5">
                            <div className="mb-3">
                              <input
                                type="text"
                                name="company_name"
                                className="form-control"
                                placeholder="Company Name"
                                value={formData.company_name}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-lg-7">
                            <div className="mb-3">
                              <input
                                type="email"
                                name="work_email"
                                className="form-control"
                                placeholder="Work Email Address"
                                value={formData.work_email}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-lg-5">
                            <div className="mb-3">
                              <input
                                type="tel"
                                name="contact_number"
                                className="form-control"
                                placeholder="Contact Number"
                                value={formData.contact_number}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-lg-7">
                            <div className="mb-3">
                              <select
                                className="form-select"
                                name="location"
                                id="locationpoopup"
                                value={formData.location}
                                onChange={handleChange}
                                required
                              >
                                <option value="">Select Location</option>
                                <option value="gurugram">Gurugram</option>
                                <option value="delhi">Delhi</option>
                                <option value="noida">Noida</option>
                              </select>
                            </div>
                          </div>

                          <div className="col-lg-5">
                            <div className="mb-3">
                              <select
                                className="form-select"
                                name="property"
                                id="propertypopup"
                                value={formData.property}
                                onChange={handleChange}
                              >
                                <option value="">Select Property</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-7">
                            <div className="mb-3">
                              <select
                                className="form-select"
                                name="solution"
                                id="solution"
                                value={formData.solution}
                                onChange={handleChange}
                                required
                              >
                                <option value="">Select Solution</option>
                                <option value="Managed Space">
                                  Managed Space
                                </option>
                                <option value="Virtual Office">
                                  Virtual Office
                                </option>
                                <option value="Co Working">Co Working</option>
                                <option value="Day Pass">Day Pass</option>
                                <option value="Meeting Room">
                                  Meeting Room
                                </option>
                                <option value="Event Space">Event Space</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="mb-3 input-box relative">
                              <input
                                type="number"
                                name="desk_required"
                                className="form-control"
                                placeholder="Desk Required"
                                min="1"
                                value={deskCount}
                                onChange={(e) =>
                                  setDeskCount(
                                    Math.max(1, parseInt(e.target.value) || 1),
                                  )
                                }
                                required
                              />
                              <div className="desk-additionbox">
                                <span
                                  className="incre"
                                  onClick={handleIncrement}
                                  style={{ cursor: "pointer" }}
                                >
                                  +
                                </span>
                                <span
                                  className="decre"
                                  onClick={handleDecrement}
                                  style={{ cursor: "pointer" }}
                                >
                                  -
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="themebtn themebtn2 mx-auto d-block"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="talk">
        <a
          href="#exampleModaltwo"
          data-bs-toggle="modal"
          data-bs-target="#exampleModaltwo"
          className="themebtn2"
        >
          <img src="/frontend_assets/img/call.png" alt="" /> Let's Talk!
        </a>
      </div>
    </>
  );
}
