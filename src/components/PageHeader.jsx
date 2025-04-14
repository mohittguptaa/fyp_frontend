import React from 'react'

const PageHeader = ({title,path}) => {
  return (
    <div className='flex-row py-24 mt-3 bg-[#FAFAFA] rounded  items-center justify-center'>
        <div >

      <h2 className='text-3xl text-blue font-medium mb-1 text-center '>
        {title}
      </h2>
        </div>
      <p className='text-sm text-center '><a href = "/">Home/</a>{path}</p>
        <div>

        </div>
    </div>
    
  )
}

export default PageHeader
