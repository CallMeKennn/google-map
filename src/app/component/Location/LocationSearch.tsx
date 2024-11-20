import L from 'leaflet';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react'
import ReactDOMServer from 'react-dom/server';
import { ImLocation } from 'react-icons/im';
import { useMapEvents, Popup } from 'react-leaflet';

const Marker = dynamic(
    () => import("react-leaflet").then((mod) => mod.Marker),
    { ssr: false }
  );

const LocationSearch = ({ positionNewSearch }: any) => {
    console.log({ positionNewSearch });
    const [position, setPosition] = useState<any>(positionNewSearch);
    const map = useMapEvents({});
  
    useEffect(() => {
      if (positionNewSearch) {
        setPosition(positionNewSearch);
        // Zoom vào vị trí mới
        // map.flyTo(positionNewSearch, 16);
      }
    }, [positionNewSearch, map]);
  
    const googleStyleNewAddressIcon = L.divIcon({
      className: "",
      html: ReactDOMServer.renderToString(
        <div className="w-6 h-6 flex justify-center items-center">
          <ImLocation color="#3b82f6" size={30} />{" "}
          {/* Customize color and size */}
        </div>
      ),
      iconSize: [24, 24], // điều chỉnh để khớp với kích thước tổng
      iconAnchor: [12, 12], // căn giữa biểu tượng
    });
  
    return position === null ? null : (
      <Marker position={position} icon={googleStyleNewAddressIcon}>
        <Popup>You are here</Popup>
      </Marker>
    );
}

export default LocationSearch