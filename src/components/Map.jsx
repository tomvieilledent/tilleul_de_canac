import { useEffect, useRef } from "react";
import { useApp } from "../app/store.jsx";
import { MAP, CONTACT } from "../lib/site.js";

export default function Map() {
  const { t } = useApp();
  const nodeRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const [{ default: L }] = await Promise.all([
        import("leaflet"),
        import("leaflet/dist/leaflet.css"),
      ]);
      if (cancelled || !nodeRef.current || mapRef.current) return;

      const pin = L.divIcon({
        className: "map-pin",
        html:
          '<svg viewBox="0 0 24 36" width="30" height="45" aria-hidden="true">' +
          '<path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="#bc6c25"/>' +
          '<circle cx="12" cy="12" r="4.5" fill="#fff"/></svg>',
        iconSize: [30, 45],
        iconAnchor: [15, 45],
        popupAnchor: [0, -42],
      });

      const map = L.map(nodeRef.current, {
        center: [MAP.lat, MAP.lon],
        zoom: MAP.zoom,
        scrollWheelZoom: false,
      });
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
      }).addTo(map);

      L.marker([MAP.lat, MAP.lon], { icon: pin })
        .addTo(map)
        .bindPopup(`${CONTACT.address1}, ${CONTACT.address2}`);
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div className="map" ref={nodeRef} role="application" aria-label={t("surroundings.mapAlt")} />;
}
