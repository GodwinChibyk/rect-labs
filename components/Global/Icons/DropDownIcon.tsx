import React from 'react'
import { IconProps } from './interface'

const DropDownIcon = ({className}:IconProps) => {
  return (
    <svg
  xmlns="http://www.w3.org/2000/svg"
  className={className}
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  strokeWidth={1}
>
  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
</svg>
  )
}

export default DropDownIcon
