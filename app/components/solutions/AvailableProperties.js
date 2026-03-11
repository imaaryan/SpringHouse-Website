"use client";

import { useState } from "react";
import PropertyCardSlider from "./PropertyCardSlider";

export default function AvailableProperties({ properties, showTabs = false }) {
  const [activeCity, setActiveCity] = useState("");

  if (!properties || properties.length === 0) {
    return (
      <section className="avail-prop ptb60 position-relative">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <span className="section-title-span">properties</span>
            </div>
          </div>
          <div className="row pe-3 ps-3">
            <div className="col-md-12 pt-4">
              <p className="text-muted">No properties found matching the selected criteria.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (showTabs) {
    /* Group properties by city for Solutions Page */
    const groupedProperties = properties.reduce((acc, property) => {
      const citySlug = property.city?.slug || "other";

      if (!acc[citySlug]) {
        acc[citySlug] = {
          name: property.city?.name || "Other",
          properties: [],
        };
      }

      acc[citySlug].properties.push(property);
      return acc;
    }, {});

    const cities = Object.values(groupedProperties);
    const displayCity = activeCity || cities[0]?.name;

    return (
      <section className="avail-prop ptb60 position-relative">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <span className="section-title-span">properties</span>
            </div>
          </div>

          <div className="row pe-3 ps-3">
            <div className="col-md-12 pt-3">
              <nav>
                <div className="nav nav-tabs mb-3">
                  {cities.map((city) => (
                    <button
                      key={city.name}
                      className={`nav-link ${
                        displayCity === city.name ? "active" : ""
                      }`}
                      onClick={() => setActiveCity(city.name)}
                    >
                      {city.name}
                    </button>
                  ))}
                </div>
              </nav>

              <div className="row">
                {cities
                  .find((city) => city.name === displayCity)
                  ?.properties.map((property) => (
                    <PropertyCardSlider key={property._id} property={property} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* Group properties by Area for Location/Property Pages */
  const groupedByArea = properties.reduce((acc, property) => {
    const areaName = property.area?.name || "Other Locations";
    if (!acc[areaName]) {
      acc[areaName] = [];
    }
    acc[areaName].push(property);
    return acc;
  }, {});

  return (
    <section className="avail-prop ptb60 position-relative">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <span className="section-title-span">properties</span>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 pt-3">
            {Object.entries(groupedByArea).map(([areaName, areaProps]) => (
              <div key={areaName} className="mb-5">
                <p className="text-uppercase mb-4 mt-2" style={{ fontSize:'20px', fontWeight: '500', letterSpacing: '0.5px' }}>
                  {areaName}
                </p>
                <div className="row">
                  {areaProps.map((property) => (
                    <PropertyCardSlider key={property._id} property={property} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
