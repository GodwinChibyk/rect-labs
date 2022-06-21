import React from "react";
import { IconProps } from "./interface";

const CheckedCircleIcon = ({className}:IconProps) => {
  return (
    <svg
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      className={className}
    >
      <path
        d="M4 7.5L7 10l4-5m-3.5 9.5a7 7 0 110-14 7 7 0 010 14z"
        stroke="currentColor"
      ></path>
    </svg>
  );
};

export default CheckedCircleIcon;
