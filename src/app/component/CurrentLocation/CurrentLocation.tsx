import L from 'leaflet';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react'
import { useMapEvents, Popup } from 'react-leaflet';

const Marker = dynamic(
    () => import("react-leaflet").then((mod) => mod.Marker),
    { ssr: false }
  );


const CurrentLocation = () => {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });
  
    useEffect(() => {
      map.locate();
    }, [map]);
  
    const googleStyleIcon = L.divIcon({
      className: "",
      html: `
      <div class="w-6 h-6 bg-blue-200 opacity-75 rounded-full flex justify-center items-center">
        <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
      </div>
    `,
      iconSize: [24, 24], // điều chỉnh để khớp với kích thước tổng
      iconAnchor: [12, 12], // căn giữa biểu tượng
    });
  
    return position === null ? null : (
      <Marker position={position} icon={googleStyleIcon}>
        <Popup>You are here</Popup>
      </Marker>
    );
}

export default CurrentLocation