"use client";
import React from "react";

export default function AboutLocation({ 
  city, 
  activeSolutions, 
  selectedSolution, 
  onSolutionChange,
  areas,
  selectedArea,
  onAreaChange
}) {
  if (!city) return null;

  return (
    <section className="specfic-guru pt30" data-aos="fade-up">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 mb-4">

            {city.description ? (
              <div 
                className="rich-text-content"
                dangerouslySetInnerHTML={{ __html: city.description }} 
              />
            ) : (
              <p>No description available for {city.name}.</p>
            )}
          </div>
          <div className="col-md-8 col-12 mt-4">
            <div className="loaction-tab flex gap-2 flex-wrap">
              <a 
                href="#filterForm" 
                onClick={(e) => { e.preventDefault(); onAreaChange?.(""); }}
                className={!selectedArea ? "active" : ""}
                style={{ cursor: "pointer", ...(!selectedArea ? { color: "#fff", background: "#0e0f11" } : {}) }}
              >
                All Areas
              </a>
              {areas?.map((area) => (
                <a 
                  key={area._id || area.slug}
                  href="#filterForm" 
                  onClick={(e) => { e.preventDefault(); onAreaChange?.(area.slug || area._id || area.name); }}
                  className={selectedArea === (area.slug || area._id || area.name) ? "active" : ""}
                  style={{ cursor: "pointer", ...(selectedArea === (area.slug || area._id || area.name) ? { color: "#fff", background: "#0e0f11" } : {}) }}
                >
                  {area.name}
                </a>
              ))}
            </div>
          </div>
          <div className="col-md-4 mt-4">
            <div className="loaction-drop">
              <form action="#" id="filterForm" method="POST" onSubmit={(e) => e.preventDefault()}>
                <select
                  className="form-select"
                  name="solution_id"
                  value={selectedSolution}
                  onChange={(e) => onSolutionChange?.(e.target.value)}
                >
                  <option value="">Select a Solution</option>
                  {activeSolutions?.map((sol) => (
                    <option key={sol._id || sol.slug} value={sol.slug || sol._id}>
                      {sol.name || sol.title || sol.slug}
                    </option>
                  ))}
                </select>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
