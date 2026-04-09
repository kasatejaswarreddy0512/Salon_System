import React from 'react'
import SalonCard from './SalonCard';

const SalonList = () => {
  return (
    <div className='flex gap-5 flex-wrap justify-center p-5'>
      {[1,2,3,4,5,6,7,8,9,10].map((item) => (
        <SalonCard key={item} />
      ))}
    </div>
  )
}

export default SalonList;