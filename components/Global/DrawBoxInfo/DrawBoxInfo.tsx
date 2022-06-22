import { type } from 'os'
import React from 'react'
import CheckedCircleIcon from '../Icons/CheckedCircleIcon'
import CloseCircleIcon from '../Icons/CloseCircleIcon'


type DRAWBOXPROPS = {
  ref?:any,
  positionX: number,
  positionY: number
}

export enum RenderXBoxDirection {
  LEFT = 'left',
  RIGHT = 'right',
}

export enum RenderYBoxDirection {
  TOP = 'top',
  BOTTOM = 'bottom',
}


const DrawBoxInfo = ({positionX, positionY}: DRAWBOXPROPS) => {
  return (
    <div className="absolute flex space-x-2" style={{
      left: `${positionX}px`,
      top: `${positionY}px`,
    }} >
    {/* <div>
      <div className="w-20 h-20 border-4 border-redColor relative"></div>
      <span className="inline-block pt-0.5 px-1 tracking-wide text-whiteColor font-semibold bg-redColor">
        Car
      </span>
    </div> */}
    <div className="px-3 py-3 rounded-2xl bg-grayColor">
      <p className="capitalize text-sm font-semibold text-textColorLight">
        label 1
      </p>
      <ul className="text-lg capitalize tracking-wide font-semibold text-textColorDark my-3">
        <li>
          car <span>|</span>
        </li>
      </ul>
      <div className="px-6 py-2 flex justify-between items-center rounded-2xl bg-whiteColor w-40">
        <button>
          <CheckedCircleIcon className="h-5 w-5 text-greenColor" />
        </button>
        <button>
          <CloseCircleIcon className="h-5 w-5 text-textColorLight" />
        </button>
      </div>
    </div>
  </div>
  )
}

export default DrawBoxInfo