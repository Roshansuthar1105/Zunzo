import React from 'react'

function HomeProductCard(props) {
    const {item} = props;
  return (
    <div className={`h-full w-full  ${item.bg_color} border-2 bg-green-200 overflow-hidden `} >
        <img className='size-fit object-fill' src={item.bg} alt="Image" />
        

    </div>
  )
}

export default HomeProductCard