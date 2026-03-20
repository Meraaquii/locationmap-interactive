import React, { useState, useEffect, useCallback } from "react";
import "./LocationMap.css";

import SchoolIcon from "@mui/icons-material/School";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MovieIcon from "@mui/icons-material/Movie";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import MapLogo from "../../assets/Nambiar Final Logo-01.png";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
} from "@vis.gl/react-google-maps";

import { APIKEY } from "../Context";

const center = { lat: 12.8748246, lng: 77.7348603 };

const customLocations = {
  shopping: [
    {
      name: "City Center Mall",
      distance: "14 KM",
      lat: 12.9755034,
      lng: 77.5764481,
    },
    {
      name: "Inorbit Mall",
      distance: "9 KM",
      lat: 12.9596271,
      lng: 77.7479488,
    },
    {
      name: "Phoenix Marketcity",
      distance: "10 KM",
      lat: 12.9957867,
      lng: 77.6964011,
    },
  ],
  education: [
    {
      name: "New Horizon Gurukul",
      distance: "11 KM",
      lat: 12.9339933,
      lng: 77.6972706,
    },
    {
      name: "GEMS Education",
      distance: "10 KM",
      lat: 12.9965973,
      lng: 77.592054,
    },
    { name: "EuroSchool", distance: "9 KM", lat: 12.9856361, lng: 77.7137513 },
    {
      name: "The International School Bangalore (TISB)",
      distance: "15 KM",
      lat: 12.8916665,
      lng: 77.7498173,
    },
    {
      name: "Pristine Public School",
      distance: "14 KM",
      lat: 12.9814528,
      lng: 77.6421897,
    },
    {
      name: "The Brigade School",
      distance: "13 KM",
      lat: 12.999006,
      lng: 77.7023733,
    },
  ],
  healthcare: [
    {
      name: "City Health Hospital",
      distance: "5 KM",
      lat: 12.907691,
      lng: 77.5708525,
    },
    {
      name: "Green Valley Medical Center",
      distance: "8 KM",
      lat: 12.9191291,
      lng: 77.6381231,
    },
    {
      name: "Manipal Hospital Bangalore",
      distance: "1 KM",
      lat: 12.9583911,
      lng: 77.6488364,
    },
    {
      name: "Sunshine Hospital",
      distance: "10 KM",
      lat: 13.059567,
      lng: 77.6485415,
    },
    {
      name: "Life Care Clinic",
      distance: "4 KM",
      lat: 12.8833984,
      lng: 77.6246954,
    },
    {
      name: "Metro Hospital Bangalore",
      distance: "6 KM",
      lat: 12.9876969,
      lng: 77.6093478,
    },
  ],
  entertainment: [
    {
      name: "Phoenix Marketcity",
      distance: "10 KM",
      lat: 12.9957867,
      lng: 77.6964011,
    },
    {
      name: "VR Bengaluru",
      distance: "8 KM",
      lat: 12.9962927,
      lng: 77.6953702,
    },
    {
      name: "Inorbit Mall",
      distance: "9 KM",
      lat: 12.9596271,
      lng: 77.7479488,
    },
    {
      name: "Forum Shantiniketan",
      distance: "7 KM",
      lat: 12.989536,
      lng: 77.7281015,
    },
    {
      name: "Brigade Gateway",
      distance: "12 KM",
      lat: 13.0103526,
      lng: 77.5569477,
    },
    {
      name: "City Center Mall",
      distance: "14 KM",
      lat: 12.9755034,
      lng: 77.5764481,
    },
  ],
};

function getColorForType(type) {
  const colors = {
    shopping: "#e74c3c",
    education: "#3498db",
    healthcare: "#2ecc71",
    entertainment: "#9b59b6",
  };
  return colors[type] || "#da4c28";
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
    default:
      return null;
  }
}

function MarkerPin({ type, name, distance, showLabel }) {
  const color = getColorForType(type);
  const icon = getIconElement(type);
  if (!icon) return null;

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
        style={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          backgroundColor: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 4px 12px ${color}88`,
          border: "3px solid white",
          flexShrink: 0,
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {icon}
      </div>

      {showLabel && (
        <div
          title={`${name} - ${distance}`}
          style={{
            marginLeft: 8,
            padding: "5px 10px",
            backgroundColor: "white",
            borderRadius: "6px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.22)",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            maxWidth: 220,
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#1a1a1a",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </span>
          <span style={{ fontSize: "11px", color: "#777", fontWeight: 500 }}>
            {distance}
          </span>
        </div>
      )}
    </div>
  );
}

function CustomPlacesMarkers({ category }) {
  const map = useMap();
  const [showLabels, setShowLabels] = useState(true);

  useEffect(() => {
    if (!map) return;

    const handleZoom = () => {
      setShowLabels(map.getZoom() >= 12);
    };

    const listener = map.addListener("zoom_changed", handleZoom);
    handleZoom();

    return () => {
      window.google?.maps?.event?.removeListener(listener);
    };
  }, [map]);

  const locations = customLocations[category] || [];

  return (
    <>
      {locations.map((place, index) => (
        <AdvancedMarker
          key={`${category}-${index}`}
          position={{ lat: place.lat, lng: place.lng }}
          title={`${place.name} - ${place.distance}`}
        >
          <MarkerPin
            type={category}
            name={place.name}
            distance={place.distance}
            showLabel={showLabels}
          />
        </AdvancedMarker>
      ))}
    </>
  );
}

function MapController({ selectedCategory, onMapReady }) {
  const map = useMap();

  useEffect(() => {
    if (map) onMapReady(map);
  }, [map, onMapReady]);

  return (
    <>
      <AdvancedMarker position={center} title="Main Location">
        <div
          style={{
            width: 80,
            height: 30,
            borderRadius: "4px",
            backgroundColor: "#ffffff",
            border: "2px solid #4285f4",
            boxShadow: "0 2px 16px rgba(66,133,244,0.8)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src={MapLogo}
            alt="Main Location"
            style={{
              position: "absolute",
              top: "52%",
              left: "46%",
              width: "55%",
              height: "55%",
              objectFit: "contain",
              transform: "translate(-50%, -50%) scale(2.5)",
            }}
          />
        </div>
      </AdvancedMarker>

      {/* Category markers */}
      {selectedCategory && <CustomPlacesMarkers category={selectedCategory} />}
    </>
  );
}

export default function LocationMap() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);

  const handleMapReady = useCallback((map) => {
    setMapInstance(map);
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (mapInstance) {
      mapInstance.panTo(center);
      mapInstance.setZoom(12);
    }
  };

  const handleCenterClick = () => {
    setSelectedCategory(null);
    if (mapInstance) {
      mapInstance.panTo(center);
      mapInstance.setZoom(12);
    }
  };

  return (
    <APIProvider apiKey={APIKEY}>
      <div className="map-page">
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
        </div>

        <button onClick={handleCenterClick} className="center-button">
          <MyLocationIcon className="map-button-icon" />
        </button>

        <div className="map-wrapper">
          <Map
            defaultCenter={center}
            defaultZoom={12}
            mapId="DEMO_MAP_ID"
            gestureHandling="greedy"
            disableDefaultUI={false}
          >
            <MapController
              selectedCategory={selectedCategory}
              onMapReady={handleMapReady}
            />
          </Map>
        </div>
      </div>
    </APIProvider>
  );
}
