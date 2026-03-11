export default function HeroBanner({ dropdownOptions = {}, data = {} }) {
  const { cities = [], solutions = [] } = dropdownOptions;
  const isVideo = data.mainBanner?.toLowerCase().endsWith(".mp4") || false;

  return (
    <div className="spring-housebaner relative">
      <div className="container-fluid p-lg-0 p-md-0 p-3 relative">
        <div className="springhouse-image ">
          {isVideo ? (
            <video
              autoPlay
              loop
              playsInline
              poster="/assets/bannerimage/1747035219_home-banner.jpg"
              preload="metadata"
              muted
              className="banner-video w-100 object-cover"
            >
              <source src={data.mainBanner} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : data.mainBanner ? (
            <img
              src={data.mainBanner}
              className="w-100 banner-video object-cover"
              alt="SpringHouse Hero Banner"
            />
          ) : (
            <img
              src="/assets/bannerimage/1747035219_home-banner.jpg"
              className="w-100 banner-video object-cover"
              alt="SpringHouse Hero Banner Fallback"
            />
          )}

          <div className="shape-bottom">
            <div className="shape-left-top">
              <svg
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-11 h-11"
                style={{ width: "1.0rem", height: "1.4rem", stroke: "#ffffff" }}
              >
                <path
                  d="M11 1.54972e-06L0 0L2.38419e-07 11C1.65973e-07 4.92487 4.92487 1.62217e-06 11 1.54972e-06Z"
                  fill="#fff"
                ></path>
              </svg>
            </div>
            <div className="shape-right-bottom">
              <svg
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-11 h-11"
                style={{ width: "1.0rem", height: "1.0rem", stroke: "#ffffff" }}
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

        <div className="spring-content" data-aos="fade-up">
          {data.subHeading && (
            <span className="section-span">{data.subHeading}</span>
          )}
          {data.heading && (
            <h2 className="section-title mt-4">
              <p>
                <span style={{ fontSize: "50px" }}>
                  <span
                    style={{ fontFamily: "GoBold,Helvetica,sans-serif" }}
                    dangerouslySetInnerHTML={{
                      __html: data.heading.replace(/\n/g, "<br />"),
                    }}
                  />
                </span>
              </p>
            </h2>
          )}
        </div>
        <div className="row1 b-lg-0 pb-5" data-aos="fade-up">
          <div className="col-md-7 offset-lg-5 offset-md-5 pe-lg-2 pe-0">
            <form id="filterForm" className="form-p" method="POST" action="#">
              <div className="row" style={{ justifyContent: "end" }}>
                <div className="col-md-4">
                  <select
                    className="form-select js-states"
                    id="single"
                    name="location_id"
                    defaultValue=""
                  >
                    <option value="">Select A City</option>
                    {cities.map((city) => (
                      <option key={city._id} value={city.slug}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <select
                    className="form-select"
                    name="solution_id"
                    defaultValue=""
                  >
                    <option value="">Select a Solution</option>
                    {solutions.map((solution) => (
                      <option key={solution._id} value={solution.slug}>
                        {solution.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <button
                    type="submit"
                    name="submit-btn"
                    className="themebtn explore themebtn2 d-block"
                  >
                    Explore
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Moved inline style to here since we can't do it globally without breaking scope easily */}
      <style
        dangerouslySetInnerHTML={{ __html: ` .form-p { display: none; } ` }}
      />
    </div>
  );
}
