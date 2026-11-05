import { useMap } from "@vis.gl/react-google-maps";
import { useEffect, useRef } from "react";

function RouteRenderer({ destination, color }) {
  const map = useMap();
  const rendererRef = useRef(null);

  useEffect(() => {
    if (!map || !destination) return;

    // Clean up previous route
    if (rendererRef.current) {
      rendererRef.current.setMap(null);
    }

    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer({
      suppressMarkers: true, // keep your custom markers
      polylineOptions: {
        strokeColor: color || "#E73E3F",
        strokeOpacity: 0.85,
        strokeWeight: 5,
      },
    });

    directionsRenderer.setMap(map);
    rendererRef.current = directionsRenderer;

    directionsService.route(
      {
        origin: center, // your existing center const
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(result);
        }
      },
    );

    return () => {
      if (rendererRef.current) rendererRef.current.setMap(null);
    };
  }, [map, destination, color]);

  return null;
}
