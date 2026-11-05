import React, { useState, useEffect, useCallback } from "react";
import "./MapLocation.css";
import SchoolIcon from "@mui/icons-material/School";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MovieIcon from "@mui/icons-material/Movie";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MapLogo from "../../assets/Srijan_Orizon_1.png";
import Logo from "../../assets/MI-Logo.jpg";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  AdvancedMarkerAnchorPoint,
  useMap,
} from "@vis.gl/react-google-maps";
import { APIKEY } from "../Context";

const center = { lat: 22.4236796, lng: 88.397762 };

const customLocations = {
  shopping: [
    {
      name: "Wood Square Mall",
      distance: "2.6 KM",
      lat: 22.4396507,
      lng: 88.3971364,
    },
    {
      name: "Southwinds Galleria Mall",
      distance: "3 KM",
      lat: 22.4083406,
      lng: 88.4125458,
    },
    {
      name: "Metropolis Mall",
      distance: "7.5 KM",
      lat: 22.48336468,
      lng: 88.39078824,
    },
    { name: "Spencers", distance: "1.8 KM", lat: 22.4366761, lng: 88.3938679 },
    {
      name: "Tata Croma",
      distance: "1.9 KM",
      lat: 22.4369944,
      lng: 88.3938643,
    },
    {
      name: "Rajpur Bazaar",
      distance: "1.8 KM",
      lat: 22.4229997,
      lng: 88.4103727,
    },
    {
      name: "Acropolis Mall",
      distance: "12.7 KM",
      lat: 22.5151592,
      lng: 88.3934189,
    },
    {
      name: "South City Mall",
      distance: "12.2 KM",
      lat: 22.504910098938645,
      lng: 88.36213045803764,
    },
  ],
  education: [
    {
      name: "Lions Vidya Mandir",
      distance: "2 KM",
      lat: 22.4157326,
      lng: 88.4077388,
    },
    {
      name: "Delhi World Public School",
      distance: "3.1 KM",
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
      distance: "5.8 KM",
      lat: 22.4675214,
      lng: 88.3779972,
    },
    {
      name: "Future Institute Engineering",
      distance: "3.9 KM",
      lat: 22.4433597,
      lng: 88.4153185,
    },
    {
      name: "Netaji Subhash Eng College",
      distance: "8.3 KM",
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
      distance: "9 KM",
      lat: 22.4912281,
      lng: 88.4024062,
    },
    {
      name: "Apollo Hospital",
      distance: "2.3 KM",
      lat: 22.4305,
      lng: 88.4025,
    },
    {
      name: "Medica Hospital",
      distance: "9.4 KM",
      lat: 22.4942987,
      lng: 88.400708,
    },
    {
      name: "Hindustan Health Point",
      distance: "5.4 KM",
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
      distance: "7.6 KM",
      lat: 22.4833577,
      lng: 88.3907365,
    },
    {
      name: "Wood Square Mall (SVF)",
      distance: "2.8 KM",
      lat: 22.4396507,
      lng: 88.3971364,
    },

    {
      name: "Acropolis Mall (PVR)",
      distance: "12.7 KM",
      lat: 22.5151592,
      lng: 88.3934189,
    },
    {
      name: "South City Mall (Inox)",
      distance: "12.2 KM",
      lat: 22.504910098938645,
      lng: 88.36213045803764,
    },
  ],
  transportation: [
    {
      name: "Shahid Khudiram Metro",
      distance: "5.6 KM",
      lat: 22.4660094,
      lng: 88.3916655,
    },
    {
      name: "Sonarpur Railway Station",
      distance: "4.8 KM",
      lat: 22.4429798,
      lng: 88.4305441,
    },
    {
      name: "Rathtala More",
      entry: "Exit And Entry 2",
      distance: "450 MTR",
      lat: 22.4275291,
      lng: 88.40161,
    },
    {
      name: "Jagaddal More",
      entry: "Exit And Entry 1",
      distance: "750 MTR",
      lat: 22.4245343,
      lng: 88.404685,
    },
    {
      name: "Ruby Crossing",
      distance: "11.3 KM",
      lat: 22.5141121,
      lng: 88.4025735,
    },
    {
      name: "Kamalgazi Flyover",
      distance: "2.9 KM",
      lat: 22.4461954,
      lng: 88.3912694,
    },
    {
      name: "Sealdah Station",
      distance: "18.8 KM",
      lat: 22.567792,
      lng: 88.3710203,
    },
    {
      name: "Howrah Station",
      distance: "29.2 KM",
      lat: 22.5830002,
      lng: 88.3372909,
    },
    {
      name: "NSCB Airport",
      distance: "31 KM",
      lat: 22.653564,
      lng: 88.4450847,
    },
    {
      name: "Garia Crossing",
      distance: "1.8 KM",
      lat: 22.4226394,
      lng: 88.4104497,
    },
  ],
};

const MARKER_ANIMATION_STYLES = `
  @keyframes markerPulse {
    0% { transform: scale(1); box-shadow: 0 0 6px 2px var(--marker-shadow); }
    50% { transform: scale(1.2); box-shadow: 0 0 14px 6px var(--marker-shadow); }
    100% { transform: scale(1); box-shadow: 0 0 6px 2px var(--marker-shadow); }
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
    healthcare: "#e02525",
    entertainment: "#9b59b6",
    transportation: "#f39c12",
  };
  return colors[type] || "#5b6c8f";
}

function getIconElement(type, size = 18) {
  const iconStyle = { color: "white", fontSize: size };
  switch (type) {
    case "shopping":
      return <ShoppingCartIcon sx={iconStyle} />;
    case "education":
      return <SchoolIcon sx={iconStyle} />;
    case "healthcare":
      return <LocalHospitalIcon sx={iconStyle} />;
    case "entertainment":
      return <MovieIcon sx={iconStyle} />;
    case "transportation":
      return <DirectionsTransitIcon sx={iconStyle} />;
    default:
      return null;
  }
}

function getIconWithName(
  type,
  name,
  distance,
  entry,
  showLabel = true,
  iconSize = 42,
) {
  const color = getColorForType(type);
  const iconElement = getIconElement(type, Math.round(iconSize * 0.43));
  if (!iconElement) return null;

  return (
    <div
      style={{
        position: "relative",
        width: iconSize,
        height: iconSize,
      }}
    >
      <div
        className="marker-icon-pulse"
        style={{
          width: iconSize,
          height: iconSize,
          borderRadius: "50%",
          backgroundColor: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "3px solid white",
          boxSizing: "border-box",
          "--marker-shadow": `#e73e3f33`,
        }}
      >
        {iconElement}
      </div>

      {showLabel && (
        <div
          title={`${name}${entry ? " - " + entry : ""} - ${distance}`}
          style={{
            position: "absolute",
            left: "100%",
            top: "50%",
            transform: "translateY(-50%)",
            marginLeft: 12,
            padding: "10px 18px",
            fontSize: "24px",
            fontWeight: 700,
            color: "#1a1a1a",
            backgroundColor: "white",
            borderRadius: "8px",
            width: "max-content",
            whiteSpace: "nowrap",
            boxShadow: "0 3px 10px rgba(0,0,0,0.25)",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            pointerEvents: "none",
          }}
        >
          <span>{name}</span>
          {entry && (
            <span
              style={{ fontSize: "15px", color: "#e02525", fontWeight: 600 }}
            >
              {entry}
            </span>
          )}
          <span style={{ fontSize: "15px", color: "#666", fontWeight: 500 }}>
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
  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    if (!map) return;
    const handleZoom = () => {
      const z = map.getZoom();
      setZoom(z);
      setShowLabels(z >= 13);
    };
    const listener = map.addListener("zoom_changed", handleZoom);
    handleZoom();
    return () => google.maps.event.removeListener(listener);
  }, [map]);

  const locations = customLocations[category] || [];

  const baseSize = 48;
  const scaledSize = Math.round(baseSize * Math.pow(1.4, zoom - 13));
  const clampedSize = Math.max(26, Math.min(scaledSize, 105));

  return (
    <>
      <style>{MARKER_ANIMATION_STYLES}</style>
      {locations.map((place, index) => (
        <AdvancedMarker
          key={`${category}-${index}`}
          position={{ lat: place.lat, lng: place.lng }}
          title={`${place.name}${place.entry ? " - " + place.entry : ""} - ${place.distance}`}
          anchorPoint={AdvancedMarkerAnchorPoint.CENTER}
        >
          {getIconWithName(
            category,
            place.name,
            place.distance,
            place.entry,
            showLabels,
            clampedSize,
          )}
        </AdvancedMarker>
      ))}
    </>
  );
}

function MapController({ selectedCategory, onMapReady }) {
  const map = useMap();
  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    if (!map) return;
    onMapReady(map);

    const styledMapType = new window.google.maps.StyledMapType(
      HIDE_POI_STYLES,
      { name: "Clean Map" },
    );
    map.mapTypes.set("clean_map", styledMapType);
    map.setMapTypeId("roadmap");

    const zoomListener = map.addListener("zoom_changed", () => {
      setZoom(map.getZoom());
    });

    return () => window.google.maps.event.removeListener(zoomListener);
  }, [map, onMapReady]);

  useEffect(() => {
    if (!map) return;
    map.setMapTypeId(selectedCategory ? "clean_map" : "roadmap");
  }, [map, selectedCategory]);

  const baseSize = 65;
  const scaledSize = Math.round(baseSize * Math.pow(1.5, zoom - 13));
  const clampedSize = Math.max(28, Math.min(scaledSize, 160));

  return (
    <>
      <style>{MARKER_ANIMATION_STYLES}</style>
      <AdvancedMarker
        position={center}
        title="Main Location"
        anchorPoint={AdvancedMarkerAnchorPoint.CENTER}
      >
        <div
          style={{
            width: clampedSize,
            height: clampedSize,
            borderRadius: "50%",
            backgroundColor: "#241319",
            border: `${Math.max(2, Math.round(clampedSize * 0.01))}px solid #4285f4`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            boxSizing: "border-box",
            transition: "width 0.2s ease, height 0.2s ease",
          }}
        >
          <img
            src={MapLogo}
            style={{ width: "81%", height: "81%", objectFit: "contain" }}
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
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [showLeftPanel, setShowLeftPanel] = useState(false);

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

  const toggleRightPanel = () => {
    if (showRightPanel) {
      setShowRightPanel(false);
      setShowLeftPanel(true);
    } else {
      setShowRightPanel(true);
      setShowLeftPanel(false);
    }
  };

  const toggleLeftPanel = () => {
    if (showLeftPanel) {
      setShowLeftPanel(false);
      setShowRightPanel(true);
    } else {
      setShowLeftPanel(true);
      setShowRightPanel(false);
    }
  };

  return (
    <APIProvider apiKey={APIKEY}>
      <div className="map-page">
        {/* Logo */}
        {/* <div className="map-logo">
          <a
            href="https://meraaquii.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Logo} alt="Mia Logo" />
          </a>
        </div> */}

        <div className="map-actions-left">
          <button
            className="map-panel-toggle-left"
            onClick={toggleLeftPanel}
            title={
              showLeftPanel ? "Hide left categories" : "Show left categories"
            }
          >
            {showLeftPanel ? (
              <ChevronLeftIcon style={{ fontSize: 20, color: "white" }} />
            ) : (
              <ChevronRightIcon style={{ fontSize: 20, color: "white" }} />
            )}
          </button>

          <div
            className={`map-actions-panel-left ${showLeftPanel ? "open" : "closed"}`}
          >
            <button
              onClick={() => handleCategoryClick("shopping")}
              className={`map-btn shopping ${selectedCategory === "shopping" ? "active" : ""}`}
              title="Shopping & Daily Needs"
            >
              <ShoppingCartIcon className="map-button-icon" />
            </button>
            <button
              onClick={() => handleCategoryClick("education")}
              className={`map-btn education ${selectedCategory === "education" ? "active" : ""}`}
              title="Educational Institutions"
            >
              <SchoolIcon className="map-button-icon" />
            </button>
            <button
              onClick={() => handleCategoryClick("healthcare")}
              className={`map-btn healthcare ${selectedCategory === "healthcare" ? "active" : ""}`}
              title="Hospital & Healthcare"
            >
              <LocalHospitalIcon className="map-button-icon" />
            </button>
            <button
              onClick={() => handleCategoryClick("entertainment")}
              className={`map-btn entertainment ${selectedCategory === "entertainment" ? "active" : ""}`}
              title="Multiplex & Entertainment"
            >
              <MovieIcon className="map-button-icon" />
            </button>
            <button
              onClick={() => handleCategoryClick("transportation")}
              className={`map-btn transportation ${selectedCategory === "transportation" ? "active" : ""}`}
              title="Transportation"
            >
              <DirectionsTransitIcon className="map-button-icon" />
            </button>
            <button onClick={handleCenterClick} className="center-button">
              <MyLocationIcon className="map-button-icon" />
            </button>
          </div>
        </div>

        {/* ================= RIGHT SIDE PANEL ================= */}
        <div className="map-actions-right">
          <button
            className="map-panel-toggle"
            onClick={toggleRightPanel}
            title={showRightPanel ? "Hide categories" : "Show categories"}
          >
            {showRightPanel ? (
              <ChevronRightIcon style={{ fontSize: 20, color: "white" }} />
            ) : (
              <ChevronLeftIcon style={{ fontSize: 20, color: "white" }} />
            )}
          </button>

          <div
            className={`map-actions-panel ${showRightPanel ? "open" : "closed"}`}
          >
            <button
              onClick={() => handleCategoryClick("shopping")}
              className={`map-btn shopping ${selectedCategory === "shopping" ? "active" : ""}`}
              title="Shopping & Daily Needs"
            >
              <ShoppingCartIcon className="map-button-icon" />
            </button>
            <button
              onClick={() => handleCategoryClick("education")}
              className={`map-btn education ${selectedCategory === "education" ? "active" : ""}`}
              title="Educational Institutions"
            >
              <SchoolIcon className="map-button-icon" />
            </button>
            <button
              onClick={() => handleCategoryClick("healthcare")}
              className={`map-btn healthcare ${selectedCategory === "healthcare" ? "active" : ""}`}
              title="Hospital & Healthcare"
            >
              <LocalHospitalIcon className="map-button-icon" />
            </button>
            <button
              onClick={() => handleCategoryClick("entertainment")}
              className={`map-btn entertainment ${selectedCategory === "entertainment" ? "active" : ""}`}
              title="Multiplex & Entertainment"
            >
              <MovieIcon className="map-button-icon" />
            </button>
            <button
              onClick={() => handleCategoryClick("transportation")}
              className={`map-btn transportation ${selectedCategory === "transportation" ? "active" : ""}`}
              title="Transportation"
            >
              <DirectionsTransitIcon className="map-button-icon" />
            </button>
            <button onClick={handleCenterClick} className="center-button">
              <MyLocationIcon className="map-button-icon" />
            </button>
          </div>
        </div>

        {/* Map Wrapper */}
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
