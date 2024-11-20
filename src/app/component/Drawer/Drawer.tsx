import React from "react";
import googleLogo from "@/app/assets/googleLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Switch } from "@mui/material";

const DrawerComponent = () => {
  return (
    <div className="w-[320px]">
      <ul className="w-full">
        <div className="px-[22px] py-1.5">
          <li className="h-8 flex justify-between items-center">
            {/* eslint-disable-next-line */}
            <img src={googleLogo.src} alt={googleLogo.src} />
            <FontAwesomeIcon icon={faXmark} />
          </li>
        </div>
        <div className="px-[22px] py-1.5">
          <li>
            <Switch />
          </li>
        </div>
        <div className="px-[22px] py-1.5">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </div>
        <div className="px-[22px] py-1.5">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </div>
        <div className="px-[22px] py-1.5">
          <li></li>
          <li></li>
          <li></li>
        </div>
        <div className="px-[22px] py-1.5">
          <li></li>
          <li></li>
          <li></li>
        </div>
      </ul>
    </div>
  );
};

export default DrawerComponent;
