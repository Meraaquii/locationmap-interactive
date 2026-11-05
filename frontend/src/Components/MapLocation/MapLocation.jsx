import React, { useState, useEffect, useCallback } from "react";
import "./MapLocation.css";
import SchoolIcon from "@mui/icons-material/School";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MovieIcon from "@mui/icons-material/Movie";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import StorefrontIcon from "@mui/icons-material/Storefront";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import TempleHinduIcon from "@mui/icons-material/TempleHindu";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ChurchIcon from "@mui/icons-material/Church";
import CookieIcon from "@mui/icons-material/Cookie";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MapLogo from "../../assets/Logo-1.png";
import Logo from "../../assets/MI-Logo.jpg";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  AdvancedMarkerAnchorPoint,
  useMap,
} from "@vis.gl/react-google-maps";
import { APIKEY } from "../Context";

const center = { lat: 22.5717424, lng: 88.2649502 };
const DEFAULT_ZOOM = 16;

const customLocations = {
  shopping: [
    {
      name: "Andul Bazar",
      distance: "3.4 KM",
      lat: 22.5850412,
      lng: 88.235651,
    },
    {
      name: "Mill Bazar",
      distance: "2.5 KM",
      lat: 22.5848689,
      lng: 88.2456044,
    },
    {
      name: "Paradise Market",
      distance: "0.4 KM",
      lat: 22.5688599,
      lng: 88.2674794,
    },
    {
      name: "Great Eastern Retail",
      distance: "1.1 KM",
      lat: 22.567148,
      lng: 88.2741426,
    },
    {
      name: "Danesh SK Lane Supermarket",
      distance: "3.4 KM",
      lat: 22.5621839,
      lng: 88.2964499,
    },
    {
      name: "More Supermarket",
      distance: "1.2 KM",
      lat: 22.5669345,
      lng: 88.2755195,
    },
    {
      name: "Chaurangi Bazar",
      distance: "1.5 KM",
      lat: 22.5806053,
      lng: 88.2754403,
    },
    {
      name: "Chatterjee Hat Bazar",
      distance: "4.2 KM",
      lat: 22.5732425,
      lng: 88.3060696,
    },
    {
      name: "Avani Mall - Reliance Smart Bazaar",
      distance: "6.1 KM",
      lat: 22.5638,
      lng: 88.32404,
    },
    {
      name: "Fancy Market - Khidirpur",
      distance: "7.0 KM",
      lat: 22.5391243,
      lng: 88.3230296,
    },
  ],
  education: [
    {
      name: "Prabhu Jagat Bandhu College",
      distance: "3.3 KM",
      lat: 22.5821672,
      lng: 88.2344678,
    },
    {
      name: "Sureswar Dutta Law College",
      distance: "0.2 KM",
      lat: 22.5728418,
      lng: 88.2632713,
    },
    {
      name: "Lotus Eng Medium School",
      distance: "0.6 KM",
      lat: 22.5670085,
      lng: 88.2665463,
    },
    {
      name: "Ideal Institute of Technical Education",
      distance: "0.7 KM",
      lat: 22.5671717,
      lng: 88.2694204,
    },
    {
      name: "Maria's Day School",
      distance: "1.4 KM",
      lat: 22.5656488,
      lng: 88.2764561,
    },
    {
      name: "West Bank School of Nursing",
      distance: "0.8 KM",
      lat: 22.5668125,
      lng: 88.2705625,
    },
    {
      name: "ACMT Group of Colleges",
      distance: "1.1 KM",
      lat: 22.5669342,
      lng: 88.2747718,
    },
    {
      name: "Sweet Angels School",
      distance: "4.1 KM",
      lat: 22.562665,
      lng: 88.3039769,
    },
    {
      name: "Shibpur B.E College",
      distance: "4.6 KM",
      lat: 22.5551124,
      lng: 88.3061642,
    },
    {
      name: "St. Mary's Convent School",
      distance: "1.3 KM",
      lat: 22.5796069,
      lng: 88.2738266,
    },
  ],
  healthcare: [
    {
      name: "Sebayan Nursing Home",
      distance: "4.3 KM",
      lat: 22.585838,
      lng: 88.2260326,
    },
    {
      name: "Disha Eye Hospital",
      distance: "1.3 KM",
      lat: 22.5789388,
      lng: 88.2555935,
    },
    {
      name: "Narayana Hospital, Chunavati",
      distance: "0.7 KM",
      lat: 22.5673769,
      lng: 88.270388,
    },
    {
      name: "Indus Nursing Home",
      distance: "0.9 KM",
      lat: 22.5672938,
      lng: 88.271843,
    },
    {
      name: "South Howrah State General Hospital",
      distance: "4.2 KM",
      lat: 22.5604348,
      lng: 88.3039731,
    },
    {
      name: "Narayana Hospital, Howrah",
      distance: "4.5 KM",
      lat: 22.5624552,
      lng: 88.308073,
    },
    {
      name: "SSKM PG Hospital",
      distance: "8.9 KM",
      lat: 22.5389877,
      lng: 88.3439071,
    },
    {
      name: "CMRI Hospital",
      distance: "7.8 KM",
      lat: 22.5321698,
      lng: 88.3278024,
    },
    {
      name: "BM Birla/Kothari Hospital",
      distance: "7.8 KM",
      lat: 22.5328893,
      lng: 88.3282827,
    },
    {
      name: "Woodlands Hospital",
      distance: "7.9 KM",
      lat: 22.5322418,
      lng: 88.3291062,
    },
  ],
  entertainment: [
    {
      name: "Swapna Cinema Hall",
      distance: "3.4 KM",
      lat: 22.5838974,
      lng: 88.2346787,
    },
    {
      name: "Wellington Cinema Hall",
      distance: "3.4 KM",
      lat: 22.585409,
      lng: 88.23549,
    },
    {
      name: "PVR - Avani Mall",
      distance: "6.1 KM",
      lat: 22.5636332,
      lng: 88.324011,
    },
    {
      name: "Nandan Cinema",
      distance: "8.9 KM",
      lat: 22.5423361,
      lng: 88.3455971,
    },
    {
      name: "Inox - Forum Mall",
      distance: "9.6 KM",
      lat: 22.5384011,
      lng: 88.3513343,
    },
    {
      name: "Inox Quest Mall",
      distance: "11.0 KM",
      lat: 22.539092,
      lng: 88.3656806,
    },
    {
      name: "Basusree Cinema",
      distance: "10.0 KM",
      lat: 22.5227918,
      lng: 88.3463607,
    },
    {
      name: "Metro - Inox",
      distance: "8.9 KM",
      lat: 22.564132,
      lng: 88.3516944,
    },
    {
      name: "The One - Dankuni",
      distance: "12.4 KM",
      lat: 22.6788774,
      lng: 88.2975413,
    },
  ],
  transportation: [
    {
      name: "Alampur Bus Stop",
      distance: "5.3 KM",
      lat: 22.584928,
      lng: 88.21571,
    },
    {
      name: "Mourigram Bus Stop",
      distance: "1.4 KM",
      lat: 22.580115,
      lng: 88.25425,
    },
    {
      name: "Chuna Bhati Bus Stop",
      distance: "0.5 KM",
      lat: 22.568387,
      lng: 88.267702,
    },
    {
      name: "Podra Bus Stop",
      distance: "0.7 KM",
      lat: 22.5678641,
      lng: 88.2704197,
    },
    {
      name: "Bakultala Post Office Bus Stop",
      distance: "2.1 KM",
      lat: 22.564938,
      lng: 88.284349,
    },
    {
      name: "Andul to Howrah Maidan Bus Route",
      distance: "2.7 KM",
      lat: 22.5847767,
      lng: 88.2430375,
    },
    {
      name: "Chunavati to Howrah Bus Route",
      distance: "0.4 KM",
      lat: 22.5687835,
      lng: 88.2674677,
    },
    // ponytail: estimated position, no reliable Places match — verify
    {
      name: "Eco Space Bus Route",
      distance: "7.3 KM",
      lat: 22.585,
      lng: 88.335,
    },
    // ponytail: estimated position, no reliable Places match — verify
    {
      name: "Mourigram to Newtown Bus Route",
      distance: "0.1 KM",
      lat: 22.5725,
      lng: 88.264,
    },
    // ponytail: estimated position, no reliable Places match — verify
    {
      name: "Mourigram to Saltlake Bus Route",
      distance: "3.6 KM",
      lat: 22.572,
      lng: 88.3,
    },
  ],
  religious: [
    {
      name: "Radha Krishna Mandir",
      distance: "2.5 KM",
      lat: 22.5648816,
      lng: 88.2421172,
    },
    {
      name: "Batai Mistanna Bhandan",
      distance: "0.8 KM",
      lat: 22.5675034,
      lng: 88.2709639,
    },
    {
      name: "Jetha Mosai Sweet Shop",
      distance: "3.4 KM",
      lat: 22.5628907,
      lng: 88.2963868,
    },
    {
      name: "Nirmala Mata Girja",
      distance: "3.4 KM",
      lat: 22.5631854,
      lng: 88.2971455,
    },
    {
      name: "Dinanta Asar Kali Temple",
      distance: "3.3 KM",
      lat: 22.5643866,
      lng: 88.2965735,
    },
    {
      name: "Talpukur Kali Temple",
      distance: "4.0 KM",
      lat: 22.5762797,
      lng: 88.3038981,
    },
    {
      name: "Rakhal Chandra Ghosh Sweet Shop",
      distance: "4.4 KM",
      lat: 22.5718414,
      lng: 88.3080149,
    },
    {
      name: "St. Paul's Cathedral",
      distance: "8.9 KM",
      lat: 22.5442706,
      lng: 88.3466532,
    },
    {
      name: "Christ the King Church",
      distance: "10.9 KM",
      lat: 22.5423126,
      lng: 88.3661579,
    },
  ],
  banks: [
    {
      name: "ICICI Bank",
      distance: "3.7 KM",
      lat: 22.5855328,
      lng: 88.2321745,
    },
    {
      name: "Bandhan Bank",
      distance: "3.1 KM",
      lat: 22.5844176,
      lng: 88.2385007,
    },
    {
      name: "Ujjivan Small Finance Bank",
      distance: "3.1 KM",
      lat: 22.5844536,
      lng: 88.2384317,
    },
    {
      name: "Canara Bank - ATM",
      distance: "2.3 KM",
      lat: 22.5822548,
      lng: 88.245623,
    },
    {
      name: "Bank of India - ATM",
      distance: "0.5 KM",
      lat: 22.5682024,
      lng: 88.2681768,
    },
    {
      name: "Axis Bank",
      distance: "0.8 KM",
      lat: 22.5673206,
      lng: 88.2705938,
    },
    {
      name: "SBI",
      distance: "2.4 KM",
      lat: 22.5640721,
      lng: 88.2869525,
    },
    {
      name: "Bank of Baroda",
      distance: "2.2 KM",
      lat: 22.5647922,
      lng: 88.2848634,
    },
    {
      name: "Bank of India",
      distance: "0.5 KM",
      lat: 22.568075,
      lng: 88.268496,
    },
    {
      name: "Axis Bank - ATM",
      distance: "0.5 KM",
      lat: 22.5678695,
      lng: 88.2682071,
    },
  ],
  pharmacy: [
    {
      name: "Maa Tara Medical Shop",
      distance: "0.4 KM",
      lat: 22.5740438,
      lng: 88.2622153,
    },
    {
      name: "Arati Medical Store",
      distance: "0.3 KM",
      lat: 22.5739667,
      lng: 88.2625424,
    },
    {
      name: "Raj's Medical",
      distance: "0.7 KM",
      lat: 22.5675975,
      lng: 88.2702406,
    },
    {
      name: "Sradhya Medical Store",
      distance: "1.0 KM",
      lat: 22.566928,
      lng: 88.27369,
    },
    {
      name: "Indus Medical Stores",
      distance: "0.9 KM",
      lat: 22.5676075,
      lng: 88.2719262,
    },
    {
      name: "Blue Print Medical Shop",
      distance: "1.8 KM",
      lat: 22.565184,
      lng: 88.2807102,
    },
    {
      name: "Frank Ross Pharmacy",
      distance: "1.4 KM",
      lat: 22.5641035,
      lng: 88.2756074,
    },
    {
      name: "M-Bazaar",
      distance: "0.8 KM",
      lat: 22.5673885,
      lng: 88.2716739,
    },
    // {
    //   name: "More Supermarket",
    //   distance: "0.9 KM",
    //   lat: 22.5712,
    //   lng: 88.274,
    // },
    {
      name: "T.N. Stores",
      distance: "1.6 KM",
      lat: 22.5718,
      lng: 88.281,
    },
  ],
  fuel: [
    {
      name: "Honda Showroom",
      distance: "5.0 KM",
      lat: 22.5859541,
      lng: 88.2186455,
    },
    {
      name: "Suzuki Showroom",
      distance: "4.3 KM",
      lat: 22.5859991,
      lng: 88.2258516,
    },
    {
      name: "KTM Showroom",
      distance: "4.2 KM",
      lat: 22.5858628,
      lng: 88.2270418,
    },
    {
      name: "Riddhi Motors",
      distance: "3.8 KM",
      lat: 22.5857853,
      lng: 88.230831,
    },
    {
      name: "Yamaha Showroom",
      distance: "4.1 KM",
      lat: 22.5858561,
      lng: 88.2283896,
    },
    {
      name: "Kawasaki Showroom",
      distance: "0.6 KM",
      lat: 22.5756252,
      lng: 88.2608284,
    },
    {
      name: "Ossum Automobile",
      distance: "3.1 KM",
      lat: 22.5631479,
      lng: 88.2933885,
    },
    {
      name: "Das Garage",
      distance: "0.8 KM",
      lat: 22.5764283,
      lng: 88.2596052,
    },
    {
      name: "HPCL - Petrol Pump",
      distance: "0.3 KM",
      lat: 22.5735246,
      lng: 88.2633035,
    },
    // ponytail: estimated position, no reliable Places match — verify
    {
      name: "BPCL - Petrol Pump",
      distance: "0.3 KM",
      lat: 22.569,
      lng: 88.265,
    },
  ],
  restaurants: [
    {
      name: "Bengal Cafe",
      distance: "3.8 KM",
      lat: 22.5854267,
      lng: 88.2308583,
    },
    {
      name: "Blue Haven Restaurant",
      distance: "2.6 KM",
      lat: 22.5845238,
      lng: 88.2435,
    },
    {
      name: "ITC Kitchen",
      distance: "0.5 KM",
      lat: 22.5684773,
      lng: 88.2680079,
    },
    {
      name: "Das Bar Cum Restaurant",
      distance: "0.2 KM",
      lat: 22.5727044,
      lng: 88.2638227,
    },
    {
      name: "Hotel Santiniketan Bar Cum Restaurant",
      distance: "0.1 KM",
      lat: 22.5721599,
      lng: 88.2642943,
    },
    {
      name: "New Sangam Bar Cum Restaurant",
      distance: "0.3 KM",
      lat: 22.5694371,
      lng: 88.2663716,
    },
    {
      name: "Fusion Delight Restaurant",
      distance: "1.8 KM",
      lat: 22.5654241,
      lng: 88.2815119,
    },
    {
      name: "Penguin Restaurant",
      distance: "3.4 KM",
      lat: 22.5632332,
      lng: 88.2962554,
    },
    {
      name: "Avani Riverside Mall",
      distance: "6.1 KM",
      lat: 22.5632174,
      lng: 88.3237031,
    },
    {
      name: "Haldiram - Rabindra Sadan",
      distance: "9.1 KM",
      lat: 22.541797,
      lng: 88.3474625,
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

const CATEGORIES = {
  education: {
    label: "Schools & Colleges",
    Icon: SchoolIcon,
    color: "#3498db",
  },
  shopping: { label: "Retail Markets", Icon: StorefrontIcon, color: "#5b6c8f" },
  transportation: {
    label: "Bus Stop & Routes",
    Icon: DirectionsBusIcon,
    color: "#f39c12",
  },
  religious: {
    label: "Religious Places & Sweets Shops",
    Icon: TempleHinduIcon,
    color: "#d35400",
    subIcons: [
      [/church|girja|cathedral/i, ChurchIcon],
      [/sweet|mistann|mishtann|ghosh/i, CookieIcon],
    ],
  },
  banks: { label: "Banks & ATMs", Icon: AccountBalanceIcon, color: "#16a085" },
  healthcare: {
    label: "Hospitals & Nursing Homes",
    Icon: LocalHospitalIcon,
    color: "#e02525",
  },
  pharmacy: {
    label: "Medicine & Convenience Stores",
    Icon: LocalPharmacyIcon,
    color: "#27ae60",
  },
  entertainment: {
    label: "Malls & Multiplexes, Cinema Halls",
    Icon: MovieIcon,
    color: "#9b59b6",
  },
  fuel: {
    label: "Petrol Pumps, Workshops & Garages",
    Icon: LocalGasStationIcon,
    color: "#7f8c8d",
    subIcons: [
      [/petrol|hpcl|bpcl|iocl|fuel/i, LocalGasStationIcon],
      [/garage|automobile|repair|service/i, CarRepairIcon],
      [/showroom|motors|honda|suzuki|ktm|yamaha|kawasaki/i, TwoWheelerIcon],
    ],
  },
  restaurants: {
    label: "Restaurants & Bars",
    Icon: RestaurantIcon,
    color: "#c0392b",
  },
};

function getColorForType(type) {
  return CATEGORIES[type]?.color || "#5b6c8f";
}

function getIconElement(type, size = 18, name = "") {
  const cat = CATEGORIES[type];
  const Icon = cat?.subIcons?.find(([re]) => re.test(name))?.[1] || cat?.Icon;
  return Icon ? <Icon sx={{ color: "white", fontSize: size }} /> : null;
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
  const iconElement = getIconElement(type, Math.round(iconSize * 0.43), name);
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

    setZoom(map.getZoom());
    const zoomListener = map.addListener("zoom_changed", () => {
      setZoom(map.getZoom());
    });

    return () => window.google.maps.event.removeListener(zoomListener);
  }, [map, onMapReady]);

  useEffect(() => {
    if (!map) return;
    map.setMapTypeId(selectedCategory ? "clean_map" : "roadmap");
  }, [map, selectedCategory]);

  const baseSize = 50;
  const scaledSize = Math.round(baseSize * Math.pow(1.35, zoom - 13));
  const cardWidth = Math.max(36, Math.min(scaledSize, 90));

  return (
    <>
      <style>{MARKER_ANIMATION_STYLES}</style>
      <AdvancedMarker
        position={center}
        title="Fortune Ikigai"
        anchorPoint={AdvancedMarkerAnchorPoint.BOTTOM_CENTER}
        zIndex={1000}
      >
        <div className="main-pin" style={{ "--pin-w": `${cardWidth}px` }}>
          <div className="main-pin-card">
            <div className="main-pin-logo">
              <img src={MapLogo} alt="Fortune Ikigai" />
            </div>
          </div>
          <div className="main-pin-pointer" />
          <div className="main-pin-pulse" />
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
      mapInstance.setZoom(DEFAULT_ZOOM);
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

  const categoryButtons = (
    <>
      {Object.entries(CATEGORIES).map(([key, { label, Icon, color, subIcons }]) => {
        // categories with subIcons show every icon, small, inside the button
        const icons = subIcons
          ? [...new Set([Icon, ...subIcons.map(([, I]) => I)])]
          : null;
        return (
          <button
            key={key}
            onClick={() => handleCategoryClick(key)}
            className={`map-btn ${icons ? "map-btn-multi" : ""} ${selectedCategory === key ? "active" : ""}`}
            style={{ background: color }}
            title={label}
            aria-label={label}
          >
            {icons ? (
              icons.map((I, i) => <I key={i} className="map-button-icon-sm" />)
            ) : (
              <Icon className="map-button-icon" />
            )}
          </button>
        );
      })}

      <button
        onClick={handleCenterClick}
        className="center-button"
        title="Reset to main location"
        aria-label="Reset to main location"
      >
        <MyLocationIcon className="map-button-icon" />
      </button>
    </>
  );

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
            {categoryButtons}
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
            {categoryButtons}
          </div>
        </div>

        {/* Map Wrapper */}
        <div className="map-wrapper">
          <Map
            defaultCenter={center}
            defaultZoom={DEFAULT_ZOOM}
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
                {Object.keys(CATEGORIES).map((key) => (
                  <CustomPlacesMarkers key={key} category={key} />
                ))}
              </>
            )}
          </Map>
        </div>
      </div>
    </APIProvider>
  );
}
