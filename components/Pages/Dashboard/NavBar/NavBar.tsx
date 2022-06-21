import Image from "next/image";
import React from "react";
import ArrowLeftIcon from "../../../Global/Icons/ArrowLeftIcon";
import DropDownIcon from "../../../Global/Icons/DropDownIcon";
import FileTransferIcon from "../../../Global/Icons/FileTransferIcon";
import PlusIcon from "../../../Global/Icons/PlusIcon";
import SendIcon from "../../../Global/Icons/SendIcon";
import { Button } from "../../../Global/StyledComponents/Button";

const NavBar = () => {
  return (
    <div className="w-full px-10 py-1 bg-whiteColor flex items-center justify-between ">
      <div className="flex items-center">
        <div className="flex items-center mr-10">
          <Button $primary={true} className="px-2 py-1 mr-3" >
            <ArrowLeftIcon className="h-5 w-5 fill-whiteColor "  />
          </Button>
          <p className="capitalize text-base text-textColorLight" >project name</p>
        </div>
        <button className="flex items-center mr-10">
          <p className="mr-1.5 capitalize text-base text-textColorLight" >type object detection</p>
          <DropDownIcon className="w-5 h-5 text-textColorDark " />
        </button>

        <button className="flex items-center mr-10">
          <p className="text-base text-textColorLight capitalize mr-1.5" >All images (14)</p>
          <DropDownIcon className="w-5 h-5 text-textColorDark " />
        </button>
      </div>

      <div className="flex items-center">
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="h-6 w-6 relative rounded-full overflow-hidden">
              <Image 
              src={"/img/user.jpeg"}
              alt="user1"
              width={100}
              height={100}
              objectFit="cover"
               />
            </div>
            <div className="h-6 w-6 relative rounded-full overflow-hidden -m-1">
            <Image 
              src={"/img/user.jpeg"}
              alt="user2"
              width={100}
              height={100}
              objectFit="cover"
               />
            </div>
          </div>
          <button className="ml-5 flex items-center ">
            <p className="mr-2 capitalize text-base text-textColorLight" >share project</p>
            <SendIcon className="text-textColorLight  h-4 w-4" />
          </button>
        </div>

        <button className="ml-16 flex items-center">
          <p className="mr-2 text-base text-textColorLight">Add image/video</p>
          <div>
            <span className=" w-4 h-4 rounded-md border border-textColorLight flex justify-center items-center">
                <PlusIcon className="text-textColorLight w-3 h-3" />
            </span>
          </div>
        </button>

        <Button $primary={true} className="ml-8 w-40 py-1.5 hover:bg-primaryColorHover " >
            <FileTransferIcon className="fill-whiteColor w-6 h-6 mr-2" />
            <span className="text-whiteColor capitalize tracking-wider font-medium">export</span>
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
