"use client";
import { useRef, useState } from "react";
import React from "react";
import { FaDirections } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import getProvinceByName from "@/app/data/actions/getProvinceByName";
import { useAppDispatch } from "@/core/hooks";
import { MapActions } from "@/core/slice";

const SearchLocation = () => {
  const [searchProvince, setSearchProvince] = useState("");
  const dispatch = useAppDispatch();
  const inputSearchRef = useRef<any>(null);

  const handlePressKeyEnter = async (event: any) => {
    if (event.key === "Enter") {
      inputSearchRef.current.blur();
      const province = await getProvinceByName(searchProvince.trim());
      if (province) {
        dispatch(
          MapActions.setProvince({
            ...province,
            geometry: {
              ...province?.geometry,
              coordinates: JSON.parse(province?.geometry?.coordinates),
            },
          })
        );
      }
    }
  };

  return (
    <div className="absolute top-3 left-[20%] transform -translate-x-1/2 z-[999] w-[400px] max-w-[calc(100%-24px)] ">
      <div className="flex items-center bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow px-4 py-2.5 gap-3">
        {/* Search Icon */}
        <div className="text-gray-600">
          <IoSearch />
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="Tìm kiếm trên Google Maps"
          className="flex-1 outline-none text-[15px] placeholder:text-gray-600"
          onChange={(e) => setSearchProvince(e.target.value)}
          onKeyDown={handlePressKeyEnter}
          ref={inputSearchRef}
        />

        {/* Directions Icon */}
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <FaDirections />
        </button>
      </div>
    </div>
  );
};

export default SearchLocation;
