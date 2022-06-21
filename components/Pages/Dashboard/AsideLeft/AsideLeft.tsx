import React from 'react'
import BoundingIcon from '../../../Global/Icons/BoundingIcon'
import FolderArrowDown from '../../../Global/Icons/FolderArrowDown'
import MessageIcon from '../../../Global/Icons/MessageIcon'
import PolygonIcon from '../../../Global/Icons/PolygonIcon'
import SearchIcon from '../../../Global/Icons/SearchIcon'
import SendIcon3 from '../../../Global/Icons/SendIcon3'
import { Button2 } from '../../../Global/StyledComponents/Button2'

const AsideLeft = () => {
  return (
    <div className='min-h-full w-48 pb-5'>
        <div className='h-4/6 bg-whiteColor px-6 flex flex-col justify-center items-center rounded-2xl'>
            <Button2 className="w-full mb-5 py-2 px-1" $active={false} >
                <SendIcon3 className='mb-0.5 h-5 w-5 text-textColorLight group-hover:text-textColorDark' />
                <span className='text-textColorLight capitalize tracking-wider'>select</span>
            </Button2>
            <Button2 className="w-full mb-5 py-2 px-1" $active={false} >
                <SearchIcon className='mb-0.5 h-5 w-5 text-textColorLight group-hover:text-textColorDark' />
                <span className='text-textColorLight capitalize tracking-wider'>zoom</span>
            </Button2>
            <Button2 className="w-full mb-5 py-2 px-1" $active={true} >
                <BoundingIcon className='mb-0.5 h-7 w-7 text-gray-400 group-hover:text-gray-500 ' />
                <span className='text-textColorLight capitalize tracking-wider'>bounding box</span>
            </Button2>
            <Button2 className="w-full mb-5 py-2 px-1" $active={false} >
                <PolygonIcon className='mb-0.5 h-8 w-8 fill-textColorLight group-hover:fill-textColorDark ' />
                <span className='text-textColorLight capitalize tracking-wider'>polygon</span>
            </Button2>
            
        </div>

        <div className='h-2/6 bg-whiteColor p-2 flex flex-col justify-center items-between rounded-2xl mt-5'>
            <Button2 className="w-full mb-10 py-2 px-1" $active={false} >
                <FolderArrowDown className=' h-16 w-16 text-primaryColor group-hover:text-primaryColorHover' />
                <span className='text-primaryColor text-lg -mt-1 font-bold capitalize tracking-wider'>save</span>
            </Button2>
            <Button2 className="w-full py-2 px-1" $active={true} >
                <MessageIcon className='mb-0.5 h-8 w-8 fill-primaryColor group-hover:text-textColorDark' />
                <span className='text-primaryColor capitalize'>chat with a team member</span>
            </Button2>
            
            
        </div>
        
    </div>
  )
}

export default AsideLeft