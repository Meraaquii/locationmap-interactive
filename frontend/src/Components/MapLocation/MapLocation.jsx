import React, { useState, useEffect } from "react";
import "./MapLocation.css";

import SchoolIcon from "@mui/icons-material/School";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MovieIcon from "@mui/icons-material/Movie";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import MapLogo from "../../assets/logo.png";
import Logo from "../../assets/Mia_Logo.png";
import bg from "../../assets/MERAAQUII.png";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
} from "@vis.gl/react-google-maps";

import { APIKEY } from "../Context";

const center = { lat: 22.425055, lng: 88.39614 };

const customLocations = {
  shopping: [
    {
      name: "Wood Square Mall",
      distance: "2.3 KM",
      lat: 22.4396507,
      lng: 88.3971364,
    },
    {
      name: "Southwinds Galleria Mall",
      distance: "4 KM",
      lat: 22.4083406,
      lng: 88.4125458,
    },
    {
      name: "Metropolish Mall",
      distance: "7.5 KM",
      lat: 22.48327468,
      lng: 88.3906139994,
    },
    {
      name: "Spencer",
      distance: "2 KM",
      lat: 22.4366561,
      lng: 88.3938879,
    },
    {
      name: "Tata Chroma",
      distance: "2 KM",
      lat: 22.4369944,
      lng: 88.3938843,
    },
    {
      name: "Rajpur Bazaar",
      distance: "1.7 KM",
      lat: 22.4229997,
      lng: 88.4103727,
    },
  ],
  education: [
    {
      name: "Lions Vidyamandir",
      distance: "2 KM",
      lat: 22.4157326,
      lng: 88.4077388,
    },
    {
      name: "Delhi World Public School",
      distance: "5.4 KM",
      lat: 22.4302068,
      lng: 88.3859974,
    },
    {
      name: "Ramkrishna Mission College",
      distance: "2.1 KM",
      lat: 22.4383885,
      lng: 88.4000884,
    },
    {
      name: "Swarnim International School",
      distance: "3.5 KM",
      lat: 22.4091629,
      lng: 88.4200593,
    },
    {
      name: "BD Memorial School",
      distance: "3.9 KM",
      lat: 22.4675214,
      lng: 88.3779972,
    },
    {
      name: "Future Institute Engineering",
      distance: "5.8 KM",
      lat: 22.4433497,
      lng: 88.4154285,
    },
    {
      name: "Netaji Subhas Eng College",
      distance: "8.8 KM",
      lat: 22.4762788,
      lng: 88.4149452,
    },
  ],
  healthcare: [
    {
      name: "Peerless Hospital",
      distance: "7.9 KM",
      lat: 22.4807775,
      lng: 88.3942466,
    },
    {
      name: "RN Tagore Hospital",
      distance: "9.1 KM",
      lat: 22.4912281,
      lng: 88.4024062,
    },
    {
      name: "Apollo Hospital (Upcoming)",
      distance: "1 KM",
      lat: 22.4305,
      lng: 88.4025,
    },
    {
      name: "Medica Hospital",
      distance: "9.3 KM",
      lat: 22.4942277,
      lng: 88.400696,
    },
    {
      name: "Hindustan Health Point",
      distance: "5.8 KM",
      lat: 22.4583119,
      lng: 88.3834594,
    },
    {
      name: "Ruby General Hospital",
      distance: "11.1 KM",
      lat: 22.5135084,
      lng: 88.402884,
    },
  ],
  entertainment: [
    {
      name: "Highland Park (Inox)",
      distance: "7.5 KM",
      lat: 22.4833577,
      lng: 88.3907365,
    },
    {
      name: "Wood Square Mall (SVF)",
      distance: "2.3 KM",
      lat: 22.4396507,
      lng: 88.3971364,
    },
  ],
  transportation: [
    {
      name: "Shahid Khudiram Metro",
      distance: "5.4 KM",
      lat: 22.4660094,
      lng: 88.3916655,
    },
    {
      name: "Sonarpur Railway Station",
      distance: "4.9 KM",
      lat: 22.4429798,
      lng: 88.4305441,
    },
    {
      name: "Southern Bypass",
      distance: "450 MTR",
      lat: 22.4226082,
      lng: 88.4035077,
    },
    {
      name: "Ruby Crossing",
      distance: "11.1 KM",
      lat: 22.5141121,
      lng: 88.4025735,
    },
    {
      name: "Kamalgazi Flyover",
      distance: "2.9 KM",
      lat: 22.4461934,
      lng: 88.3912494,
    },
    {
      name: "Sealdah Station",
      distance: "19 KM",
      lat: 22.567792,
      lng: 88.3710203,
    },
    {
      name: "Howrah Station",
      distance: "29.3 KM",
      lat: 22.5830002,
      lng: 88.3372909,
    },
    {
      name: "NSCB Airport",
      distance: "29.7 KM",
      lat: 22.653564,
      lng: 88.4450847,
    },
    {
      name: "Garia Crossing",
      distance: "6.8 KM",
      lat: 22.46578,
      lng: 88.377919,
    },
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

// Component to handle centering
function MapCenterControl({ onCenter }) {
  const map = useMap();

  const handleCenter = () => {
    if (map) {
      map.panTo(center);
      map.setZoom(13);
      if (onCenter) onCenter();
    }
  };

  return null;
}

// Main map component
export default function MapLocation() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);

  const handleCategoryClick = (category) => {
    setShowAll(false);
    setSelectedCategory(category);
    if (mapInstance) {
      mapInstance.panTo(center);
      mapInstance.setZoom(13);
    }
  };

  const handleCenterClick = () => {
    setSelectedCategory(null);
    setShowAll(false);
    if (mapInstance) {
      mapInstance.panTo(center);
      mapInstance.setZoom(13);
    }
  };

  return (
    <APIProvider apiKey={APIKEY}>
      <div className="map-page">
        <div className="map-logo">
          <a
            href="https://meraaquii.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Logo} alt="Mia Logo" />
          </a>
        </div>
        <div className="map-actions">
          <button
            onClick={() => handleCategoryClick("shopping")}
            className={`map-btn shopping ${selectedCategory === "shopping" ? "active" : ""}`}
          >
            <ShoppingCartIcon className="map-button-icon" />
            Shopping & Daily Needs
          </button>

          <button
            onClick={() => handleCategoryClick("education")}
            className={`map-btn education ${selectedCategory === "education" ? "active" : ""}`}
          >
            <SchoolIcon className="map-button-icon" />
            Educational Institutions
          </button>

          <button
            onClick={() => handleCategoryClick("healthcare")}
            className={`map-btn healthcare ${selectedCategory === "healthcare" ? "active" : ""}`}
          >
            <LocalHospitalIcon className="map-button-icon" />
            Hospital & Healthcare
          </button>

          <button
            onClick={() => handleCategoryClick("entertainment")}
            className={`map-btn entertainment ${selectedCategory === "entertainment" ? "active" : ""}`}
          >
            <MovieIcon className="map-button-icon" />
            Multiplex
          </button>

          <button
            onClick={() => handleCategoryClick("transportation")}
            className={`map-btn transportation ${selectedCategory === "transportation" ? "active" : ""}`}
          >
            <DirectionsTransitIcon className="map-button-icon" />
            Transportation
          </button>

          <div className="map-bg-container">
            <img src={bg} alt="Meraaquii" className="map-bg-image" />
          </div>
        </div>

        <button onClick={handleCenterClick} className="center-button">
          <MyLocationIcon className="map-button-icon" />
        </button>

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
            onCameraChanged={(ev) => {
              setMapInstance(ev.map);
            }}
          >
            {/* Main location marker with proper logo display */}
            <AdvancedMarker position={center} title="Main Location">
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                  border: "2px solid #4285f4",
                  boxShadow: "0 2px 16px rgba(66, 133, 244, 3.8)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <img
                  src={MapLogo}
                  alt="Main Location Logo"
                  style={{
                    position: "absolute",
                    top: "56%",
                    left: "50%",
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    transform: "translate(-50%, -50%) scale(2.5)",
                  }}
                />
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
