import "./property.css";
import Header from "../../../components/Home/Header";
import Footer from "../../../components/Home/Footer";
import ImageSlider from "../../../components/Properties/ImageSlider";
import PropertyCardSlider from "@/app/components/Solutions/PropertyCardSlider";
import Link from "next/link";

const ASSET_BASE = "https://mediumspringgreen-salmon-328707.hostingersite.com";

async function getProperties() {
  const res = await fetch("http://localhost:3000/api/properties", {
    cache: "no-store",
  });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data;
}

export default async function Page({ params }) {
  const { slug: citySlug, properties: propSlug } = await params;
  const allProperties = await getProperties();

  const property = allProperties.find((p) => p.slug === propSlug);

  if (!property)
    return <div className="p-5 text-center">Property Not Found</div>;

  // --- UPDATED FILTERING LOGIC ---
  // 1. Get properties in Same Area (excluding current)
  const sameArea = allProperties.filter(
    (p) => p.area.name === property.area.name && p.slug !== property.slug,
  );

  // 2. Get properties in Same City but Different Area
  const sameCityDifferentArea = allProperties.filter(
    (p) =>
      p.city.slug === property.city.slug &&
      p.area.name !== property.area.name &&
      p.slug !== property.slug,
  );

  // 3. Combine: Area first, then City (Limit to 4 total, no other cities)
  const relatedProperties = [...sameArea, ...sameCityDifferentArea].slice(0, 4);

  // Filter other city links for the footer section
  const otherCityLinks = [
    { name: "Noida", slug: "noida" },
    { name: "Delhi", slug: "delhi" },
    { name: "Gurugram", slug: "gurugram" },
  ].filter((c) => c.slug !== citySlug);

  return (
    <>
      <Header />

      {/* Banner Section */}
      <div className="loctions golf-course">
        <div className="container-fluid">
          <div className="row pt30">
            <div className="col-lg-12 mb-4">
              <ImageSlider
                images={property.images}
                className="image-slider"
                propertyName={property.name}
              />
              <span className="locationscard relative">
                <div className="shape-bottom">
                  <div className="shape-left-top-gs">
                    <svg
                      viewBox="0 0 11 11"
                      fill="none"
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
                      />
                    </svg>
                  </div>
                  <div className="shape-right-bottom">
                    <svg
                      viewBox="0 0 11 11"
                      fill="none"
                      className="w-11 h-11"
                      style={{
                        width: "1.8rem",
                        height: "1.8rem",
                        stroke: "#ffffff",
                      }}
                    >
                      <path
                        d="M11 1.54972e-06L0 0L2.38419e-07 11C1.65973e-07 4.92487 4.92487 1.62217e-06 11 1.54972e-06Z"
                        fill="#0e0f11"
                        style={{ fill: "#ffffff" }}
                      />
                    </svg>
                  </div>
                </div>
                <div className="location-content">
                  <span className="section-span">{property.propertyCode}</span>
                  <h4 className="section-title text-uppercase">
                    {property.area.name}
                  </h4>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Details */}
      <div className="get-touch pb-4">
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center">
            <div className="col-lg-5">
              <div className="get-left-touch relative pe-md-5">
                <h1>
                  <span style={{ fontSize: 18 }}>
                    {property.name} ({property.propertyCode})
                  </span>
                </h1>
                <div className="mt-3" style={{ whiteSpace: "pre-line" }}>
                  {property.description}
                </div>
                <p className="mt-4">
                  <b>Total Sqft Area:</b> {property.size?.toLocaleString()}
                </p>
                <p>
                  <b>Address:</b> {property.fullAddress}
                </p>
              </div>
            </div>
            {/* Form section remains static as per your template */}
            <div className="col-lg-7">
              <div className="get-right-touch pe-md-5">
                <div className="get-right-head">
                  <h2 className="font46 textcenter">
                    get in touch <span>with us</span>
                  </h2>
                </div>
                <div className="get-call mt-4">
                  <div className="get-call-icon relative">
                    <div className="icon-shape-circle" />
                    <div className="call-icon">
                      <img
                        src="https://springhouse.in/frontend_assets/img/call.png"
                        alt="coworking spaces – SpringHouse coworking office view"
                      />
                    </div>
                  </div>
                  <div className="get-call-no">
                    <a href="tel: +91 9899936669">+91 9899936669</a>
                  </div>
                </div>
                <div className="get-right-form-design mt20">
                  <form action="">
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Full Name"
                      />
                    </div>
                    <div className="row">
                      <div className="col-lg-5">
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Company Name"
                          />
                        </div>
                      </div>
                      <div className="col-lg-7">
                        <div className="mb-3">
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Work Email Address"
                          />
                        </div>
                      </div>
                      <div className="col-lg-5">
                        <div className="mb-3">
                          <input
                            type="phone"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Contact Number"
                          />
                        </div>
                      </div>
                      <div className="col-lg-7">
                        <div className="mb-3">
                          <select className="form-select">
                            <option selected="">Location</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-5">
                        <div className="mb-3">
                          <select className="form-select">
                            <option selected="">Property</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-7">
                        <div className="mb-3">
                          <select className="form-select">
                            <option selected="">Solution</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="mb-3 input-box relative">
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Desk Required"
                          />
                          <div className="desk-additionbox">
                            <span className="incre">+</span>
                            <span className="decre">-</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      name="submit-btn"
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

      {/* Amenities */}
      <section className="specfic-prop amenities pt-5">
        <div className="container-fluid">
          <div className="row mb-4">
            <div className="col-lg-6 col-12">
              <span className="section-title-span">amenities</span>
            </div>
          </div>
          <div className="row line pe-3 ps-lg-3 ps-md-3 ps-0">
            {property.amenities.map((amenity) => (
              <div
                key={amenity._id}
                className="col-md-3 col-6 mb-5 property-amenities"
              >
                <div className="icon-amen text-center">
                  <img
                    src={`${ASSET_BASE}${amenity.featuredIcon}`}
                    alt={amenity.name}
                  />
                  <a href="#">{amenity.name}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="specfic-prop property-spec pt60">
        <div className="container-fluid">
          <div className="row mb-4">
            <div className="col-lg-6">
              <span className="section-title-span">
                property specific solutions
              </span>
            </div>
          </div>
          <div className="row pe-3 ps-3">
            {property.activeSolutions.map((sol) => (
              <div key={sol._id} className="col-md-4 back pe-4 mb-3">
                <div className="row">
                  <div className="col-12 col-md-5 col-lg-5 position-relative p-0">
                    <div className="service-img1">
                      {/* IMAGE */}
                      <img src={`${ASSET_BASE}${sol.image}`} alt={sol.name} />

                      <div className="shape-bottom-right">
                        <div className="shape-right-top">
                          <svg
                            viewBox="0 0 11 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-11 h-11"
                            style={{ width: 5, height: 5, stroke: "#f6f4f4" }}
                          >
                            <path
                              d="M11 1.54972e-06L0 0L2.38419e-07 11C1.65973e-07 4.92487 4.92487 1.62217e-06 11 1.54972e-06Z"
                              fill="#f6f4f4"
                            />
                          </svg>
                        </div>

                        <div className="shape-left-bottom">
                          <svg
                            viewBox="0 0 11 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-11 h-11"
                            style={{ width: 5, height: 5, stroke: "#f6f4f4" }}
                          >
                            <path
                              d="M11 1.54972e-06L0 0L2.38419e-07 11C1.65973e-07 4.92487 4.92487 1.62217e-06 11 1.54972e-06Z"
                              fill="#ffffff"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-7 col-12 ps-4 pt-3 pb-lg-4 pb-md-0 pb-3 d-flex flex-column justify-content-center">
                    {/* TITLE */}
                    <div className="ps-0">
                      <div className="h5 mb-0">{sol.name}</div>
                    </div>

                    {/* BUTTON */}
                    <div className="bottom-right">
                      <a
                        href={`#solutionModal-${sol._id}`}
                        className="details-link enquire"
                        data-bs-toggle="modal"
                        data-bs-target={`#solutionModal-${sol._id}`}
                        data-title={sol.name}
                      >
                        enquire now
                      </a>
                    </div>

                    {/* MODAL */}
                    <div
                      className="modal fade"
                      id={`solutionModal-${sol._id}`}
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                          />

                          <div className="modal-body">
                            <div className="row">
                              {/* LEFT SIDE */}
                              <div className="col-lg-5">
                                <div className="get-left-touch relative">
                                  <div className="get-call">
                                    <div className="get-call-icon relative">
                                      <div className="icon-shape-circle"></div>
                                      <div className="call-icon">
                                        <img
                                          src="https://springhouse.in/frontend_assets/img/call.png"
                                          alt="call"
                                        />
                                      </div>
                                    </div>

                                    <div className="get-call-no">
                                      <a href="tel:+919899936669">
                                        +91 9899936669
                                      </a>
                                    </div>
                                  </div>

                                  <div className="get-image-bottom mt20 relative">
                                    <div className="get-image">
                                      <img
                                        src="https://springhouse.in/frontend_assets/img/get-touch.png"
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* RIGHT SIDE FORM */}
                              <div className="col-lg-7">
                                <div className="get-right-touch mt-4">
                                  <div className="get-right-head">
                                    <h2 className="font46 textcenter">
                                      get in touch <span>with us</span>
                                    </h2>
                                  </div>

                                  <div className="get-right-form-design mt20">
                                    <form>
                                      <div className="mb-3">
                                        <input
                                          type="text"
                                          name="full_name"
                                          className="form-control"
                                          placeholder="Full Name"
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
                                            />
                                          </div>
                                        </div>

                                        <div className="col-lg-7">
                                          <div className="mb-3">
                                            <input
                                              type="email"
                                              name="email"
                                              className="form-control"
                                              placeholder="Work Email Address"
                                            />
                                          </div>
                                        </div>

                                        <div className="col-lg-12">
                                          <div className="mb-3">
                                            <input
                                              type="text"
                                              name="solution"
                                              className="form-control"
                                              value={sol.name}
                                              readOnly
                                            />
                                          </div>
                                        </div>

                                        <div className="col-lg-12">
                                          <div className="mb-3 input-box relative">
                                            <input
                                              type="text"
                                              name="desk"
                                              className="form-control"
                                              placeholder="Desk Required"
                                            />
                                            <div className="desk-additionbox">
                                              <span className="incre">+</span>
                                              <span className="decre">-</span>
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <div className="managed-office-section office-sec ptb60">
        <div className="container-fluid">
          <div className="managed-office-bg1 relative">
            <div className="row">
              <div className="mapouter" style={{ width: "100%" }}>
                <div
                  className="gmap_canvas"
                  dangerouslySetInnerHTML={{ __html: property.locationOnMap }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other Properties (Filtered logic applied) */}
      <section className="specfic-prop pt-3">
        <div className="container-fluid">
          <div className="row mb-4">
            <div className="col-lg-6">
              <span className="section-title-span">other properties</span>
            </div>
          </div>
          <div className="row pe-3 ps-3">
            {relatedProperties.map((item) => (
              <PropertyCardSlider key={item._id} property={item} />
            ))}
          </div>
          <div className="col-md-12 pt-3 ">
            <div className="see-more">
              <Link href={`/coworking-space/${property.city.slug}`}>
                See More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Footer */}
      <section className="specfic-prop amenities pt60 pb60">
        <div className="container-fluid">
          <div className="row mb-4">
            <div className="col-lg-6 col-12">
              <span className="section-title-span">Other locations</span>
            </div>
          </div>
          <div className="row">
            {otherCityLinks.map((city) => (
              <div key={city.slug} className="col-md-6 col-6">
                <div className="box-loc mb-lg-0 mb-md-0 mb-3">
                  <Link href={`/coworking-space/${city.slug}`}>
                    {city.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
