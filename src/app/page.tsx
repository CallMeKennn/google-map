"use client";

import { useState, useEffect } from "react";
import Siderbar from "./component/Sidebar/Siderbar";
import { Drawer } from "@mui/material";
import DrawerComponent from "./component/Drawer/Drawer";
import "leaflet/dist/leaflet.css";
import MapComponent from "./component/Map/MapComponent";
import SearchLocation from "./component/SearchLocation/SearchLocation";
import addProvincesToFirestore from "./data/actions/addProvince";
import getProvinces from "./data/actions/getProvinces";

export default function Home() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open: boolean) => {
    setOpen(open);
  };

  useEffect(() => {
    addProvincesToFirestore();
    const listProvinces = getProvinces();
    console.log(listProvinces);
  }, []);

  return (
    <div className="map-container flex w-screen h-screen relative">
      <SearchLocation />
      <Siderbar toggleDrawer={toggleDrawer} />
      <MapComponent />
      <Drawer open={open} onClose={() => toggleDrawer(false)}>
        <DrawerComponent />
      </Drawer>
    </div>
  );
}
