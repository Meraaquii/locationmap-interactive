import React, { useState, useEffect } from "react";
import "./MapLocation.css";

import SchoolIcon from "@mui/icons-material/School";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MovieIcon from "@mui/icons-material/Movie";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
} from "@vis.gl/react-google-maps";

import { APIKEY } from "../Context";

const center = { lat: 22.425055, lng: 88.39614 };

// Custom location data with approximate coordinates
const customLocations = {
  shopping: [
    {
      name: "Wood Square Mall",
      distance: "2.3 KM",
      lat: 22.4358,
      lng: 88.4105,
    },
    {
      name: "Southwinds Galleria Mall",
      distance: "4 KM",
      lat: 22.4589,
      lng: 88.3956,
    },
    {
      name: "Metropolish Mall",
      distance: "7.5 KM",
      lat: 22.4978,
      lng: 88.4125,
    },
    { name: "Spencer", distance: "2 KM", lat: 22.4405, lng: 88.4008 },
    { name: "Tata Chroma", distance: "2 KM", lat: 22.4398, lng: 88.4015 },
    { name: "Rajpur Bazaar", distance: "1.7 KM", lat: 22.4385, lng: 88.3985 },
  ],
  education: [
    { name: "Lions Vidyamandir", distance: "2 KM", lat: 22.4402, lng: 88.3995 },
    {
      name: "Delhi World Public School",
      distance: "5.4 KM",
      lat: 22.3895,
      lng: 88.3658,
    },
    {
      name: "Ramkrishna Mission College",
      distance: "2.1 KM",
      lat: 22.4452,
      lng: 88.3892,
    },
    {
      name: "Swarnim International School",
      distance: "3.5 KM",
      lat: 22.4558,
      lng: 88.4025,
    },
    {
      name: "BD Memorial School",
      distance: "3.9 KM",
      lat: 22.4625,
      lng: 88.3895,
    },
    {
      name: "Future Institute Engineering",
      distance: "5.8 KM",
      lat: 22.4785,
      lng: 88.4235,
    },
    {
      name: "Netaji Subhas Eng College",
      distance: "8.8 KM",
      lat: 22.5125,
      lng: 88.4458,
    },
  ],
  healthcare: [
    {
      name: "Peerless Hospital",
      distance: "7.9 KM",
      lat: 22.5025,
      lng: 88.3658,
    },
    {
      name: "RN Tagore Hospital",
      distance: "9.1 KM",
      lat: 22.5158,
      lng: 88.3625,
    },
    {
      name: "Apollo Hospital (Upcoming)",
      distance: "1 KM",
      lat: 22.4305,
      lng: 88.4025,
    },
    { name: "Medica Hospital", distance: "9.3 KM", lat: 22.5185, lng: 88.3598 },
    {
      name: "Hindustan Health Point",
      distance: "5.8 KM",
      lat: 22.4785,
      lng: 88.4158,
    },
    {
      name: "Ruby General Hospital",
      distance: "11.1 KM",
      lat: 22.5358,
      lng: 88.3495,
    },
  ],
  entertainment: [
    {
      name: "Highland Park (Inox)",
      distance: "7.5 KM",
      lat: 22.4978,
      lng: 88.4125,
    },
    {
      name: "Wood Square Mall (SVF)",
      distance: "2.3 KM",
      lat: 22.4358,
      lng: 88.4105,
    },
  ],
  transportation: [
    {
      name: "Shahid Khudiram Metro",
      distance: "5.4 KM",
      lat: 22.4715,
      lng: 88.3625,
    },
    {
      name: "Sonarpur Railway Station",
      distance: "4.9 KM",
      lat: 22.4458,
      lng: 88.3758,
    },
    {
      name: "Southern Bypass",
      distance: "450 MTR",
      lat: 22.4215,
      lng: 88.3975,
    },
    { name: "Ruby Crossing", distance: "11.1 KM", lat: 22.5358, lng: 88.3495 },
    {
      name: "Kamalgazi Flyover",
      distance: "2.9 KM",
      lat: 22.4485,
      lng: 88.3895,
    },
    { name: "Sealdah Station", distance: "19 KM", lat: 22.5675, lng: 88.3695 },
    { name: "Howrah Station", distance: "29.3 KM", lat: 22.5825, lng: 88.3425 },
    { name: "NSCB Airport", distance: "29.7 KM", lat: 22.6545, lng: 88.4465 },
    { name: "Garia Crossing", distance: "6.8 KM", lat: 22.4685, lng: 88.3785 },
  ],
};

function getIconWithName(type, name, distance, showLabel = true) {
  const wrapperStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  const circleStyle = {
    width: 32,
    height: 32,
    borderRadius: "50%",
    backgroundColor: getColorForType(type),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: `0 4px 12px ${getColorForType(type)}66`,
    border: "3px solid white",
    color: "white",
    fontSize: 18,
    transition: "transform 0.2s ease",
  };

  const labelStyle = {
    padding: "6px 12px",
    fontSize: "13px",
    fontWeight: 600,
    color: "#1a1a1a",
    backgroundColor: "white",
    borderRadius: "6px",
    maxWidth: 250,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    marginLeft: 10,
    display: showLabel ? "flex" : "none",
    flexDirection: "column",
    gap: "2px",
  };

  const distanceStyle = {
    fontSize: "11px",
    color: "#666",
    fontWeight: 500,
  };

  let iconElement = null;

  switch (type) {
    case "shopping":
      iconElement = <ShoppingCartIcon sx={{ color: "white", fontSize: 18 }} />;
      break;
    case "education":
      iconElement = <SchoolIcon sx={{ color: "white", fontSize: 18 }} />;
      break;
    case "healthcare":
      iconElement = <LocalHospitalIcon sx={{ color: "white", fontSize: 18 }} />;
      break;
    case "entertainment":
      iconElement = <MovieIcon sx={{ color: "white", fontSize: 18 }} />;
      break;
    case "transportation":
      iconElement = (
        <DirectionsTransitIcon sx={{ color: "white", fontSize: 18 }} />
      );
      break;
    default:
      return null;
  }

  return (
    <div
      style={wrapperStyle}
      onMouseEnter={(e) => {
        const circle = e.currentTarget.querySelector("div:first-child");
        if (circle) circle.style.transform = "scale(1.2)";
      }}
      onMouseLeave={(e) => {
        const circle = e.currentTarget.querySelector("div:first-child");
        if (circle) circle.style.transform = "scale(1)";
      }}
    >
      <div style={circleStyle}>{iconElement}</div>
      <div style={labelStyle} title={`${name} - ${distance}`}>
        <span>{name}</span>
        <span style={distanceStyle}>{distance}</span>
      </div>
    </div>
  );
}

function getColorForType(type) {
  const colors = {
    shopping: "#e74c3c",
    education: "#3498db",
    healthcare: "#2ecc71",
    entertainment: "#9b59b6",
    transportation: "#f39c12",
  };
  return colors[type] || "#da4c28";
}

// Component to render custom markers
function CustomPlacesMarkers({ category }) {
  const map = useMap();
  const [showLabels, setShowLabels] = useState(true);

  useEffect(() => {
    if (!map) return;

    const handleZoom = () => {
      const currentZoom = map.getZoom();
      setShowLabels(currentZoom >= 13);
    };

    const listener = map.addListener("zoom_changed", handleZoom);
    handleZoom();

    return () => {
      google.maps.event.removeListener(listener);
    };
  }, [map]);

  const locations = customLocations[category] || [];

  return (
    <>
      {locations.map((place, index) => (
        <AdvancedMarker
          key={`${category}-${index}`}
          position={{
            lat: place.lat,
            lng: place.lng,
          }}
          title={`${place.name} - ${place.distance}`}
        >
          {getIconWithName(category, place.name, place.distance, showLabels)}
        </AdvancedMarker>
      ))}
    </>
  );
}

// Main map component
export default function MapLocation() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const handleCategoryClick = (category) => {
    setShowAll(false);
    setSelectedCategory(category);
  };

  const handleShowAll = () => {
    setShowAll(true);
    setSelectedCategory(null);
  };

  const handleClear = () => {
    setShowAll(false);
    setSelectedCategory(null);
  };

  return (
    <APIProvider apiKey={APIKEY}>
      <div className="map-page">
        <div className="map-actions">
          <button
            onClick={() => handleCategoryClick("shopping")}
            className={selectedCategory === "shopping" ? "active" : ""}
            style={{ backgroundColor: "#e74c3c" }}
          >
            <ShoppingCartIcon className="map-button-icon" />
            Shopping & Daily Needs
          </button>

          <button
            onClick={() => handleCategoryClick("education")}
            className={selectedCategory === "education" ? "active" : ""}
            style={{ backgroundColor: "#3498db" }}
          >
            <SchoolIcon className="map-button-icon" />
            Educational Institutions
          </button>

          <button
            onClick={() => handleCategoryClick("healthcare")}
            className={selectedCategory === "healthcare" ? "active" : ""}
            style={{ backgroundColor: "#2ecc71" }}
          >
            <LocalHospitalIcon className="map-button-icon" />
            Hospital & Healthcare
          </button>

          <button
            onClick={() => handleCategoryClick("entertainment")}
            className={selectedCategory === "entertainment" ? "active" : ""}
            style={{ backgroundColor: "#9b59b6" }}
          >
            <MovieIcon className="map-button-icon" />
            Multiplex
          </button>

          <button
            onClick={() => handleCategoryClick("transportation")}
            className={selectedCategory === "transportation" ? "active" : ""}
            style={{ backgroundColor: "#f39c12" }}
          >
            <DirectionsTransitIcon className="map-button-icon" />
            Transportation
          </button>

          <button
            onClick={handleShowAll}
            className={showAll ? "active" : ""}
            style={{
              backgroundColor: "#34495e",
            }}
          >
            Show All
          </button>

          <button
            onClick={handleClear}
            style={{
              backgroundColor: "#95a5a6",
            }}
          >
            Clear
          </button>
        </div>

        <div className="map-wrapper">
          <Map
            defaultCenter={center}
            defaultZoom={13}
            mapId="DEMO_MAP_ID"
            gestureHandling="greedy"
            scrollwheel
            draggable
            zoomControl
            keyboardShortcuts
            disableDefaultUI={false}
          >
            {/* Main location marker */}
            <AdvancedMarker position={center} title="Main Location">
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  backgroundColor: "#4285f4",
                  border: "5px solid white",
                  boxShadow: "0 6px 16px rgba(66, 133, 244, 0.6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "24px",
                }}
              >
                🏠
              </div>
            </AdvancedMarker>

            {/* Render markers based on selection */}
            {selectedCategory && (
              <CustomPlacesMarkers category={selectedCategory} />
            )}
            {showAll && (
              <>
                <CustomPlacesMarkers category="shopping" />
                <CustomPlacesMarkers category="education" />
                <CustomPlacesMarkers category="healthcare" />
                <CustomPlacesMarkers category="entertainment" />
                <CustomPlacesMarkers category="transportation" />
              </>
            )}
          </Map>
        </div>
      </div>
    </APIProvider>
  );
}
