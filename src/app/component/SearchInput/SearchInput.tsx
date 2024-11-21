"use client";
import { useRef, useState, useEffect } from "react";
import React from "react";
import { FaDirections } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useAppDispatch } from "@/core/hooks";
import { MapActions } from "@/core/slice";
import { cn } from "@/app/lib/utils";
import getProvinceByName from "@/app/data/actions/getProvinceByName";
import getProvinces from "@/app/data/actions/getProvinces";
import _ from "lodash";

const SearchLocation = () => {
  const [searchProvince, setSearchProvince] = useState("");
  const [allProvinces, setAllProvinces] = useState<any>([]);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const inputSearchRef = useRef<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const provinces = await getProvinces();
      setAllProvinces(provinces);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        inputSearchRef.current &&
        !inputSearchRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
    <div className="absolute top-3 left-[19.25rem] transform -translate-x-1/2 z-[999] w-[376px] max-w-[calc(100%-24px)] ">
      <div
        ref={inputSearchRef}
        className={cn(
          "flex items-center bg-white  shadow-lg hover:shadow-xl transition-shadow px-4 py-2.5 gap-3",
          isOpen && !_.isEmpty(allProvinces)
            ? "rounded-t-[12px]"
            : "rounded-full"
        )}
      >
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
          onClick={() => setIsOpen(!isOpen)}
        />

        {/* Directions Icon */}
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <FaDirections className="hover:text-[#1A73E8]" />
        </button>
      </div>

      {isOpen && !_.isEmpty(allProvinces) && (
        <div className="absolute top-12 w-full bg-white border-t-0 border-gray-200 rounded-b-[12px] shadow-md max-h-61 overflow-y-auto z-10">
          <ul>
            {/* <li className="h-11 px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
              Result 1
            </li>
            <li className="h-11 px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
              Result 2
            </li>
            <li className="h-11 px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
              Result 3
            </li>
            <li className="h-11 px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
              Result 3
            </li>
            <li className="h-11 px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
              Result 3
            </li> */}
            {allProvinces
              .filter((item: any) =>
                item?.name_lowercase?.includes(
                  searchProvince?.toLocaleLowerCase()
                )
              )
              .slice(0, 5)
              .map((item: any, index: number) => (
                <li
                  className="h-11 px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  key={index}
                >
                  {item.name}
                </li>
              ))}
          </ul>
          <div className="py-3 text-[#1A73E8] hover:bg-gray-100 text-center cursor-pointer">
            More from recent history
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchLocation;
