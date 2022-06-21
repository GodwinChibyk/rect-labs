import Image from "next/image";
import React from "react";
import DropDownIcon from "../../../Global/Icons/DropDownIcon";

const Header = () => {
  return (
    <div className="w-full px-10 py-1 bg-whiteColor flex justify-between items-center mb-1.5">
      <div className="w-16 h-16 rounded-full relative overflow-hidden">
        <Image
          src="/img/logo.png"
          className="w-full h-full"
          alt="logo"
          objectFit="contain"
          height={100}
          width={100}
        />
      </div>

      <div className="flex items-center">
        <p className="text-textColorLight text-base">
          Account type: <span className="ml-1">Professional</span>
        </p>
        <div className="flex items-center ml-8">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image
              src="/img/profile.jpg"
              height={100}
              width={100}
              alt="profile pic"
              objectFit="cover"
            />
          </div>
          <button className="flex items-center ml-2">
            <p className="text-textColorDark">Isaac Olagoke</p>
            <DropDownIcon className="w-5 h-5 text-gray-600  ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
