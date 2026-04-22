import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSalons } from 'src/Redux/Salon/action';
import SalonCard from './SalonCard';

const SalonList = () => {
  const dispatch = useDispatch();
  const { auth, salon } = useSelector(store => store);

  useEffect(() => {
    dispatch(fetchSalons());
  }, [dispatch, auth?.jwt]);

  return (
    <div className='flex gap-5 flex-wrap justify-center p-5'>
      {salon?.salons?.map((item) => (
        <SalonCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default SalonList;