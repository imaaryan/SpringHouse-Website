import "./property.css";

export default function PropertySolutions({ activeSolutions }) {
  if (!activeSolutions || activeSolutions.length === 0) return null;

  return (
    <section className="specfic-prop property-spec pt-5 pb-5">
      <div className="container-fluid">
        <div className="row mb-4">
          <div className="col-lg-6">
            <span className="section-title-span">
              property specific solutions
            </span>
          </div>
        </div>
        <div className="row pe-3 ps-3 mt-4">
          {activeSolutions.map((sol) => (
            <div key={sol._id} className="col-md-4 back pe-4 mb-3">
              <div className="row">
                <div className="col-12 col-md-5 col-lg-5 position-relative p-0">
                  <div className="service-img1">
                    <img src={sol.image} alt={sol.name} />
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
                  <div className="ps-0">
                    <div className="h5 mb-0">{sol.name}</div>
                  </div>
                  <div className="bottom-right">
                    <a
                      href={`#solutionModal-${sol._id}`}
                      className="details-link enquire"
                      data-bs-toggle="modal"
                      data-bs-target={`#solutionModal-${sol._id}`}
                    >
                      enquire now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
