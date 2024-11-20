import React from "react";

interface Props {
  infoLocation: {
    img: string[];
    location: string;
  };
}

const AddressItem: React.FC<Props> = ({ infoLocation }) => {
  const { img, location } = infoLocation;
  return (
    <div className="relative mx-auto mt-7">
      <img
        className="w-[28px] h-[28px] rounded-md absolute -top-2 right-[9px] border-2 border-white"
        src={img[0]}
        alt="123"
      />
      <img className="w-[28px] h-[28px] rounded-md" src={img[1]} alt="123" />
      <span className="text-white absolute top-0 right-3">{img.length}</span>
      <span className="text-[11px] text-[#88898A] hover:text-[#202124] cursor-pointer">
        {location}
      </span>
    </div>
  );
};

export default AddressItem;
