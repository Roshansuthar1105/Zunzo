import React from 'react'

function Home() {
  return (
    <div>
    <h2 className='text-3xl text-center m-6 font-bold' >Home Page</h2>
    <div className='h-[80dvh] bg-red-2000 m-auto rounded-3xl border-4 my-auto border-indigo-400 flex items-center justify-center overflow-hidden ' >
        <img className='size-full object-cover' src="https://images.pexels.com/photos/193478/pexels-photo-193478.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Image container" />
    </div>
    </div>
  )
}

export default Home