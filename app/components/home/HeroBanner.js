export default function HeroBanner() {
  return (
    <div className="spring-housebaner relative">
      <div className="container-fluid p-lg-0 p-md-0 p-3 relative">
        <div className="springhouse-image ">
          <video
            autoPlay
            loop
            playsInline
            poster="/assets/bannerimage/1747035219_home-banner.jpg"
            preload="metadata"
            muted
            className="banner-video"
          >
            <source
              src="/frontend_assets/img/banner-video.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="shape-bottom">
            <div className="shape-left-top">
              <svg
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-11 h-11"
                style={{ width: "1.0rem", height: "1.0rem", stroke: "#ffffff" }}
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
          <span className="section-span">CREATE. SIEZE. PROGRESS.</span>
          <h2 className="section-title mt-2">
            <p>
              <span style={{ fontSize: "20px" }}>
                <span style={{ fontFamily: "Arial,Helvetica,sans-serif" }}>
                  a space to work.
                  <br />a community to grow.
                </span>
              </span>
            </p>
          </h2>
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
                    <option value="gurugram">Gurugram</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <select
                    className="form-select"
                    name="solution_id"
                    defaultValue=""
                  >
                    <option value="">Select a Solution</option>
                    <option value="1">Managed Office</option>
                    <option value="2">Virtual Office</option>
                    <option value="3">Coworking</option>
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
