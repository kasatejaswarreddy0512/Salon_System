import React, { useEffect } from 'react';
import SalonDrawerList from './Component/SalonDrawerList';
import NavBar from '../AdminSalon/NavBar';
import SalonRoutes from '../Routes/SalonRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { fectchSalonByOwner } from 'src/Redux/Salon/action';
import { getUser } from 'src/Redux/Auth/action';
import UseNotificationWebsocket from 'src/util/UseNotificationWebsocket';

const SalonDashBoard = () => {
  const dispatch = useDispatch();
  const { salon } = useSelector((store) => store);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    dispatch(fectchSalonByOwner(jwt));
    dispatch(getUser(jwt));
  }, [dispatch]);

  UseNotificationWebsocket(salon.salon?.id, "salon");

  return (
    <div className='min-h-screen'>
      <NavBar DrawerList={SalonDrawerList} />

      <section className='lg:flex lg:h-[90vh]'>
        <div className='hidden lg:block h-full'>
          <SalonDrawerList />
        </div>

        <div className='p-10 w-full lg:w-[80%] overflow-y-auto'>
          <SalonRoutes />
        </div>
      </section>
    </div>
  );
};

export default SalonDashBoard;