import React from 'react'

const Banner = () => {
  return (
    <div className='w-full relative h-[90vh]'>

      <video
        muted
        autoPlay
        loop
        className='w-full h-full object-cover'
        src='https://booksy-public.s3.amazonaws.com/horizontal_.webm'
      />

      <div className='absolute flex flex-col items-center justify-center inset-0 text-white space-y-2 z-20 px-5 text-center'>
        
        <h1 className='text-5xl font-bold'>Be Your Self</h1>

        <p className='text-slate-300 text-2xl font-semibold'>
          Discover and Book, wellness near you.
        </p>

        <input
          className='bg-white rounded-md py-4 focus:outline-none w-[15rem] md:w-[33rem] text-black px-5 mx-auto'
          type="text"
          placeholder='Search Salon Services...'
        />

      </div>
    </div>
  )
}

export default Banner;