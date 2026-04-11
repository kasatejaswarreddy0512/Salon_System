import React from 'react'
import SalonDrawerList from './Component/SalonDrawerList';
import NavBar from '../AdminSalon/NavBar';

const SalonDashBoard = () => {
  return (
    <div className='min-h-screen'>

      <NavBar DrawerList={SalonDrawerList} />

      <section className='lg:flex lg:h-[90vh]'>
        <div className='hidden lg:block h-full'>
          <SalonDrawerList />
        </div>
      </section>

    </div>
  )
}

export default SalonDashBoard