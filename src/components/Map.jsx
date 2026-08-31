import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MAP } from "../lib/site.js";

const pinIcon = L.divIcon({
  className: "map-pin",
  html: `<svg viewBox="0 0 24 36" width="30" height="45" aria-hidden="true">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="#bc6c25"/>
    <circle cx="12" cy="12" r="4.5" fill="#fff"/>
  </svg>`,
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [0, -42],
});

export default function Map() {
  const ref = useRef(null);

  useEffect(() => {
    const map = L.map(ref.current, {
      center: [MAP.lat, MAP.lon],
      zoom: MAP.zoom,
      scrollWheelZoom: false,
      attributionControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    L.marker([MAP.lat, MAP.lon], { icon: pinIcon })
      .addTo(map)
      .bindPopup(MAP.label);

    return () => map.remove();
  }, []);

  return <div className="map" ref={ref} role="img" aria-label={MAP.label} />;
}
