"use client";
import React from "react";

export default function AboutLocation() {
  return (
    <section className="specfic-guru pt30" data-aos="fade-up">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 mb-4">
            <h3 className="mb-3">About Gurugram</h3>
            <p>
              Often referred to as the Cyber City, Gurugram sits on the national
              borders contiguous to New Delhi. Housing 300+ Fortune 500
              companies, Gurugram has become the third largest IT hub in the
              state. From major to minor businesses, entrepreneurs are
              consistently entering the market to test the waters with new ideas
              giving rise to the need for{" "}
              <a
                href="https://springhouse.in/coworking/coworking-space-in-gurgaon.php"
                rel="noopener"
                target="_blank"
              >
                <strong>coworking spaces in Gurugram</strong>
              </a>
              .
            </p>
            <p>
              It acts like a pedestal for new startups offering an array of{" "}
              <strong>coworking spaces in Gurugram</strong> where you can
              launch, stabilize and expand your business efficiently with
              limited cost.
            </p>
          </div>
          <div className="col-md-8 col-12 mt-4">
            <div className="loaction-tab">
              <a href="#Golf Course Road">Golf Course Road</a>
              <a href="#DLF Phase 5">DLF Phase 5</a>
            </div>
          </div>
          <div className="col-md-4 mt-4">
            <div className="loaction-drop">
              <form action="#" id="filterForm" method="POST">
                <select
                  className="form-select"
                  name="solution_id"
                  onChange={(e) => {
                    // Logic for sort/filter can be implemented later
                  }}
                >
                  <option value="">Select a Solution</option>
                  <option value="1">Managed Office</option>
                  <option value="2">Virtual Office</option>
                  <option value="3">Coworking</option>
                </select>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
