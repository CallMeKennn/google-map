"use client";

import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import AddressItem from "../AddressItem/AddressItem";

const imgs = {
  location: "Hà nội",
  img: [
    "https://image.baophapluat.vn/w840/Uploaded/2024/athlraqhpghat/2023_06_25/ho-hoan-kiem-7185.jpg",
    "https://vietbis.vn/Image/Picture/Hanoi/duong-pho-ha-noi-maps.jpg",
    "https://image.baophapluat.vn/w840/Uploaded/2024/athlraqhpghat/2023_06_25/ho-hoan-kiem-7185.jpg",
  ],
};

interface Props {
  toggleDrawer: (open: boolean) => void;
}

const Siderbar: React.FC<Props> = ({ toggleDrawer }) => {
  const [isOpen, setIsOpen] = useState("");

  const handleOpenDrawer = (open: boolean) => {
    toggleDrawer(open);
  };

  const handleOpenSave = (open: string) => {
    setIsOpen(open);
  };

  const handleOpenRecent = (open: string) => {
    setIsOpen(open);
  };
  //
  return (
    <div className="w-14 z-[999] bg-white h-screen shadow-sidebars flex flex-col item-center">
      <div className="flex flex-col w-full items-center h-[200px] justify-around">
        <FontAwesomeIcon
          onClick={() => handleOpenDrawer(true)}
          className="w-[24px] cursor-pointer"
          icon={faBars}
        />
        <div
          onClick={() => handleOpenSave("save")}
          className="cursor-pointer flex flex-col items-center"
        >
          <FontAwesomeIcon
            className={`${
              isOpen === "save" ? "text-[#1A73E8]" : ""
            } w-[24px] cursor-pointer`}
            icon={faBookmark}
          />
          <span
            className={`${
              isOpen === "save"
                ? " text-[#1A73E8]"
                : "text-[#88898A] hover:text-[#202124]"
            } text-[11px] cursor-pointer font-medium`}
          >
            Đã lưu
          </span>
        </div>
        <div
          onClick={() => handleOpenRecent("recent")}
          className="cursor-pointer flex flex-col items-center"
        >
          <FontAwesomeIcon
            className={`${
              isOpen === "recent" ? "text-[#1A73E8]" : ""
            } w-[24px] cursor-pointer`}
            icon={faClockRotateLeft}
          />
          <span
            className={`${
              isOpen === "recent"
                ? " text-[#1A73E8]"
                : "text-[#88898A] hover:text-[#202124]"
            } text-[11px] cursor-pointer font-medium`}
          >
            Gần đây
          </span>
        </div>
      </div>

      <div className="bg-black h-[2px] w-2/3 mx-auto"></div>

      <AddressItem infoLocation={imgs} />
      <AddressItem infoLocation={imgs} />
      <AddressItem infoLocation={imgs} />
      <AddressItem infoLocation={imgs} />
      <AddressItem infoLocation={imgs} />
    </div>
  );
};

export default Siderbar;
