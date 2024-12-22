import React from 'react'
import HomeProductCard from '../components/home/HomeProductCard'

function Home() {
  const products = [
    {id:0,color:"text-blue-800",bg_color:"bg-red-400",bg:"https://images.pexels.com/photos/193478/pexels-photo-193478.jpeg?auto=compress&cs=tinysrgb&w=800"},
    {id:1,color:"text-blue-800",bg_color:"bg-sky-400",bg:"https://images.pexels.com/photos/193478/pexels-photo-193478.jpeg?auto=compress&cs=tinysrgb&w=800"},
    {id:2,color:"text-blue-800",bg_color:"bg-gray-400",bg:"https://images.pexels.com/photos/193478/pexels-photo-193478.jpeg?auto=compress&cs=tinysrgb&w=800"},
    {id:3,color:"text-blue-800",bg_color:"bg-indigo-400",bg:"https://images.pexels.com/photos/193478/pexels-photo-193478.jpeg?auto=compress&cs=tinysrgb&w=800"},
  ];
  return (
    <div className='flex flex-col gap-10' >
      <h2 className='text-3xl text-center font-bold' >Home Page</h2>
      <div className='h-[80dvh] w-full bg-red-2000 m-auto rounded-3xl border-4 my-auto border-indigo-400 flex items-center justify-center overflow-hidden ' >
        <img className='size-full object-cover' src="https://images.pexels.com/photos/193478/pexels-photo-193478.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Image container" />
      </div>
      {/* <div className=' h-[60dvh] w-full border-2 border-white bg-amber-300 m-0 flex flex-row rounded-md' >
          <div className='w-3/5' >
          </div>
          <div className='w-2/5 flex flex-row justify-center gap-7 items-center flex-wrap h-full bg-purple-900' >
            <div className='block border-2' >1</div>
            <div className='block border-2 ' >2</div>
            <div className='block border-2 ' >3</div>
            <div className='block border-2 ' >4</div>
          </div>
      </div> */}
    </div>
  )
}

export default Home