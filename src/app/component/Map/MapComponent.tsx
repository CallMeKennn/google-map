"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/core/hooks";
import { MapSelectors } from "@/core/slice";
import _ from "lodash";
import React from "react";
import dynamic from "next/dynamic";

//import css
import "./style.css";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet";

//import component
import ProvinceSearch from "../Province/ProvinceSearch";
import LocationSearch from "../Location/LocationSearch";
import CurrentLocation from "../CurrentLocation/CurrentLocation";
// import Routing from "../Routing/Routing";

declare module "leaflet" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Routing {
    function control(options: any): any;
  }
}

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const MapComponent = () => {
  // const [isClient, setIsClient] = useState<boolean>(false);
  const provinces = useAppSelector(MapSelectors.provinces);
  const [searchPosition, setSearchPosition] = useState<any>(null);
  // const [firstPosition] = useState<[number, number]>([20.978398, 105.819824]);
  // const [secondPosition] = useState<[number, number]>([20.987207, 105.796815]);
  // const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!_.isEmpty(provinces)) {
      setSearchPosition(provinces);
    }
  }, [provinces]);

  return (
    <div className="h-screen flex-1 relative">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        minZoom={3}
        scrollWheelZoom={true}
        className="h-screen"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {searchPosition && (
          <LocationSearch
            key={`${searchPosition[0]}-${searchPosition[1]}-${Date.now() + 1}`}
            positionNewSearch={[searchPosition.lat, searchPosition.lng]}
          />
        )}
        {searchPosition && (
          <ProvinceSearch
            key={`${searchPosition[0]}-${searchPosition[1]}-${Date.now()}`}
            positionNewSearch={searchPosition}
          />
        )}

        <CurrentLocation />
      </MapContainer>
    </div>
  );
};

export default MapComponent;

{
  /* Tìm tuyến đường đến */
}
{
  /* <Routing start={firstPosition} end={secondPosition} /> */
}
