import React from "react";
import { IconProps } from "./interface";

const SendIcon3 = ({className}:IconProps) => {
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
        d="M.5.5l6 14 2-6 6-2-14-6z"
        stroke="currentColor"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

export default SendIcon3;
