import L from 'leaflet';
import { useEffect, useRef } from 'react'
import { useMap } from 'react-leaflet';

const Routing = ({
  start,
  end,
}: {
  start: [number, number];
  end: [number, number];
}) => {
  const map = useMap();
  const routingControlRef = useRef<null>(null);

  useEffect(() => {
    if (!map) return;

    const createRoutingControl = () => {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
      }
      routingControlRef.current = L.Routing.control({
        waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
        routeWhileDragging: true,
        addWaypoints: false,
        lineOptions: {
          styles: [
            // Layer ngoài cùng - viền xám mờ
            {
              color: "#7B7B7B",
              opacity: 0.4,
              weight: 14,
            },
            // Layer viền xám đậm hơn
            {
              color: "#7B7B7B",
              opacity: 0.6,
              weight: 10,
            },
            // Layer viền trắng
            {
              color: "white",
              opacity: 0.9,
              weight: 8,
            },
            // Layer trong cùng - màu xanh
            {
              color: "#4285F4",
              opacity: 1,
              weight: 5,
            },
          ],
          extendToWaypoints: true,
          missingRouteTolerance: 0,
        },
        createMarker: function () {
          return null;
        }, // ẩn markers mặc định
        show: true, // ẩn bảng chỉ đường
      }).addTo(map);
    };

    if (window.L && window.L.Routing) {
      createRoutingControl();
    } else {
      // Load Leaflet Routing Machine dynamically if not available
      const script = document.createElement("script");
      script.src =
        "https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js";
      script.async = true;
      script.onload = createRoutingControl;
      document.body.appendChild(script);
    }

    return () => {
      if (map && routingControlRef.current) {
        map.removeControl(routingControlRef.current);
        routingControlRef.current = null;
      }
    };
  }, [map, start, end]);

  return null;
};

export default Routing