import React from 'react'
import Banner from './Banner';
import HomeServiceCard from './HomeServiceCard';
import services from '../../Data/services';
import SalonList from '../Salon/SalonList';

const Home = () => {
  return (
    <div className='space-y-20'>

      {/* Banner Section */}
      <section className='h-[90vh] bg-green-500 flex'>
        <Banner />
      </section>

      {/* Services Section */}
      <section className='space-y-10 lg:space-y-0 flex flex-col lg:flex-row gap-5 px-20 items-center'>
        
        <div className='w-full lg:w-1/2'>
          <h1 className='text-2xl font-semibold pb-9'>
            What are you looking for, Bestie? 👀
          </h1>

          <div className='flex flex-wrap justify-center items-center gap-5'>
            {
              services.map((item) => (
                <HomeServiceCard key={item.id} item={item} />
              ))
            }
          </div>
        </div>

        <div className='w-full lg:w-1/2 border grid gap-3 grid-cols-2 grid-rows-12 h-[60vh]  md:h-[90vh] rounded-md'>
          
          <div className='row-span-7'>
            <img
              className='w-full h-full rounded-md'
              src="https://i.pinimg.com/736x/d2/3b/d6/d23bd66dff2665f5e215a20ff32ed0c6.jpg"
              alt=""
            />
          </div>

          <div className='row-span-5'>
            <img
              className='h-full w-full rounded-md'
              src="https://wallpapers.com/images/hd/relaxing-back-massage-040s7w89zft4mvzu.jpg"
              alt=""
            />
          </div>

          <div className='row-span-7'>
            <img
              className='w-full h-full rounded-md'
              src="https://tse1.mm.bing.net/th/id/OIP.Xn_PhEtwwfNv6Ifj5JyxAAHaLH?w=768&h=1152&rs=1&pid=ImgDetMain&o=7&rm=3"
              alt=""
            />
          </div>

          <div className='row-span-5'>
            <img
              className='h-full w-full rounded-md'
              src="https://cdn0.weddingwire.in/article/5885/original/1280/jpg/45885-side-hairstyles-aanal-savaliya-side-braid-embedded-with-pearls.jpeg"
              alt=""
            />
          </div>

        </div>
      </section>

      {/* Salon Section */}
      <section className='px-20 space-y-10 lg:space-y-0 flex flex-col items-center justify-center'>
        <h1 className='text-2xl font-semibold pb-9'>
          Book Your Favorite Salon 🤔
        </h1>
        <SalonList />
      </section>
    
      {/* Footer Section */}
      <section className='h-[10vh] bg-green-500 flex items-center justify-center'>
        <h1 className='text-3xl font-bold text-white'>
          Footer Section 🚀
        </h1>
      </section>

    </div>
  )
}

export default Home;