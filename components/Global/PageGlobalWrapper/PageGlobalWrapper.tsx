import React from 'react'

const PageGlobalWrapper = ({children}:any) => {
  return (
    <div className='min-h-screen w-full bg-grayColor'>
        {children}
    </div>
  )
}

export default PageGlobalWrapper