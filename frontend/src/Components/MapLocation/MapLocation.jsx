import React, { useState, useEffect, useCallback } from "react";
import "./MapLocation.css";

import SchoolIcon from "@mui/icons-material/School";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MovieIcon from "@mui/icons-material/Movie";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import MapLogo from "../../assets/logo.png";
import Logo from "../../assets/Mia_Logo.png";

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

const MARKER_ANIMATION_STYLES = `
  @keyframes markerPulse {
    0% {
      transform: scale(1);
      box-shadow: 0 0 6px 2px var(--marker-shadow);
    }
    50% {
      transform: scale(1.2);
      box-shadow: 0 0 14px 6px var(--marker-shadow);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 6px 2px var(--marker-shadow);
    }
  }

  .marker-icon-pulse {
    animation: markerPulse 1.8s ease-in-out infinite;
  }
`;

const HIDE_POI_STYLES = [
  {
    featureType: "poi",
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [{ visibility: "off" }],
  },
  { featureType: "poi.business", stylers: [{ visibility: "off" }] },
  { featureType: "poi.attraction", stylers: [{ visibility: "off" }] },
  { featureType: "poi.government", stylers: [{ visibility: "off" }] },
  { featureType: "poi.medical", stylers: [{ visibility: "off" }] },
  {
    featureType: "poi.park",
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
  { featureType: "poi.place_of_worship", stylers: [{ visibility: "off" }] },
  { featureType: "poi.school", stylers: [{ visibility: "off" }] },
  { featureType: "poi.sports_complex", stylers: [{ visibility: "off" }] },
  {
    featureType: "transit",
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
];

function getColorForType(type) {
  const colors = {
    shopping: "#5b6c8f",
    education: "#3498db",
    healthcare: "#2ecc71",
    entertainment: "#9b59b6",
    transportation: "#f39c12",
  };
  return colors[type] || "#5b6c8f";
}

function getIconElement(type) {
  switch (type) {
    case "shopping":
      return <ShoppingCartIcon sx={{ color: "white", fontSize: 18 }} />;
    case "education":
      return <SchoolIcon sx={{ color: "white", fontSize: 18 }} />;
    case "healthcare":
      return <LocalHospitalIcon sx={{ color: "white", fontSize: 18 }} />;
    case "entertainment":
      return <MovieIcon sx={{ color: "white", fontSize: 18 }} />;
    case "transportation":
      return <DirectionsTransitIcon sx={{ color: "white", fontSize: 18 }} />;
    default:
      return null;
  }
}

function getIconWithName(type, name, distance, showLabel = true) {
  const color = getColorForType(type);
  const iconElement = getIconElement(type);
  if (!iconElement) return null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <div
        className="marker-icon-pulse"
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          backgroundColor: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "3px solid white",
          flexShrink: 0,
          "--marker-shadow": `#e73e3f33`,
        }}
      >
        {iconElement}
      </div>

      <div
        title={`${name} - ${distance}`}
        style={{
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
        }}
      >
        <span>{name}</span>
        <span style={{ fontSize: "11px", color: "#666", fontWeight: 500 }}>
          {distance}
        </span>
      </div>
    </div>
  );
}

function CustomPlacesMarkers({ category }) {
  const map = useMap();
  const [showLabels, setShowLabels] = useState(true);

  useEffect(() => {
    if (!map) return;
    const handleZoom = () => setShowLabels(map.getZoom() >= 13);
    const listener = map.addListener("zoom_changed", handleZoom);
    handleZoom();
    return () => google.maps.event.removeListener(listener);
  }, [map]);

  const locations = customLocations[category] || [];

  return (
    <>
      <style>{MARKER_ANIMATION_STYLES}</style>
      {locations.map((place, index) => (
        <AdvancedMarker
          key={`${category}-${index}`}
          position={{ lat: place.lat, lng: place.lng }}
          title={`${place.name} - ${place.distance}`}
        >
          {getIconWithName(category, place.name, place.distance, showLabels)}
        </AdvancedMarker>
      ))}
    </>
  );
}

function MapController({ selectedCategory, onMapReady }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    onMapReady(map);

    const styledMapType = new window.google.maps.StyledMapType(
      HIDE_POI_STYLES,
      { name: "Clean Map" },
    );
    map.mapTypes.set("clean_map", styledMapType);
    map.setMapTypeId("roadmap");
  }, [map, onMapReady]);

  useEffect(() => {
    if (!map) return;
    map.setMapTypeId(selectedCategory ? "clean_map" : "roadmap");
  }, [map, selectedCategory]);

  return (
    <>
      <style>{MARKER_ANIMATION_STYLES}</style>

      {/* Main location marker */}
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

      {selectedCategory && <CustomPlacesMarkers category={selectedCategory} />}
    </>
  );
}

export default function MapLocation() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);

  const handleMapReady = useCallback((map) => {
    setMapInstance(map);
  }, []);

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
          >
            <MapController
              selectedCategory={selectedCategory}
              onMapReady={handleMapReady}
            />

            {/* Show-all markers */}
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
