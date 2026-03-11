"use client";
import React, { useState } from "react";
import AboutLocation from "./AboutLocation";
import AvailableProperties from "../solutions/AvailableProperties";

export default function LocationContentWrapper({ 
  city, 
  cityProperties, 
  activeSolutions,
  areas 
}) {
  const [selectedSolution, setSelectedSolution] = useState("");
  const [selectedArea, setSelectedArea] = useState(""); // "" means 'All Areas'

  // Filter properties based on selected solution AND selected area
  const filteredProperties = cityProperties.filter((property) => {
    // Check Solution filter
    let matchSolution = true;
    if (selectedSolution) {
      matchSolution = property.activeSolutions?.some(
        (sol) => sol.slug === selectedSolution || sol._id === selectedSolution
      );
    }

    // Check Area filter
    let matchArea = true;
    if (selectedArea) {
      // Assuming property.area is populated with slug or _id, or just id string
      // Depends on how dummy data / real data structures 'area' on a 'property'
      matchArea = property.area?.slug === selectedArea || property.area?._id === selectedArea || property.area === selectedArea;
    }

    return matchSolution && matchArea;
  });

  return (
    <>
      <AboutLocation
        city={city}
        activeSolutions={activeSolutions}
        selectedSolution={selectedSolution}
        onSolutionChange={setSelectedSolution}
        areas={areas}
        selectedArea={selectedArea}
        onAreaChange={setSelectedArea}
      />
      <AvailableProperties properties={filteredProperties} />
    </>
  );
}
