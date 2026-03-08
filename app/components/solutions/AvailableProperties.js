"use client";

import { useState } from "react";
import PropertyCardSlider from "./PropertyCardSlider";

export default function AvailableProperties({ properties }) {
  if (!properties || properties.length === 0) return null;

  /* Group properties by city */
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

  const [activeCity, setActiveCity] = useState(cities[0].name);

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
            {/* Tabs */}
            <nav>
              <div className="nav nav-tabs mb-3">
                {cities.map((city) => (
                  <button
                    key={city.name}
                    className={`nav-link ${
                      activeCity === city.name ? "active" : ""
                    }`}
                    onClick={() => setActiveCity(city.name)}
                  >
                    {city.name}
                  </button>
                ))}
              </div>
            </nav>

            {/* Properties */}
            <div className="row">
              {cities
                .find((city) => city.name === activeCity)
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
