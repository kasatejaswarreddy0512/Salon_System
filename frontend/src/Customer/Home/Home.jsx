import React from 'react';
import Banner from './Banner';
import HomeServiceCard from './HomeServiceCard';
import services from '../../Data/services';
import SalonList from '../Salon/SalonList';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1">
        {/* Banner Section */}
        <section className="h-[90vh] bg-green-500 flex">
          <Banner />
        </section>

        {/* Services Section */}
        <section className="py-20 flex flex-col lg:flex-row gap-5 px-6 md:px-10 lg:px-20 items-center">
          <div className="w-full lg:w-1/2">
            <h1 className="text-2xl font-semibold pb-9">
              What are you looking for, Bestie? 👀
            </h1>

            <div className="flex flex-wrap justify-center items-center gap-5">
              {services.map((item) => (
                <HomeServiceCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2 border grid gap-3 grid-cols-2 grid-rows-12 h-[60vh] md:h-[90vh] rounded-md overflow-hidden">
            <div className="row-span-7">
              <img
                className="w-full h-full rounded-md object-cover"
                src="https://i.pinimg.com/736x/d2/3b/d6/d23bd66dff2665f5e215a20ff32ed0c6.jpg"
                alt="Salon service"
              />
            </div>

            <div className="row-span-5">
              <img
                className="h-full w-full rounded-md object-cover"
                src="https://wallpapers.com/images/hd/relaxing-back-massage-040s7w89zft4mvzu.jpg"
                alt="Massage service"
              />
            </div>

            <div className="row-span-7">
              <img
                className="w-full h-full rounded-md object-cover"
                src="https://tse1.mm.bing.net/th/id/OIP.Xn_PhEtwwfNv6Ifj5JyxAAHaLH?w=768&h=1152&rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="Beauty service"
              />
            </div>

            <div className="row-span-5">
              <img
                className="h-full w-full rounded-md object-cover"
                src="https://cdn0.weddingwire.in/article/5885/original/1280/jpg/45885-side-hairstyles-aanal-savaliya-side-braid-embedded-with-pearls.jpeg"
                alt="Hair styling"
              />
            </div>
          </div>
        </section>

        {/* Salon Section */}
        <section className="pb-20 px-6 md:px-10 lg:px-20 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold pb-9">
            Book Your Favorite Salon 🤔
          </h1>
          <SalonList />
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-green-500 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h1 className="text-3xl font-bold mb-4">Glow & Go ✨</h1>
              <p className="text-sm leading-6 text-white/90">
                Discover salons, explore services, and book your beauty
                appointments with ease.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
              <ul className="space-y-2 text-white/90">
                <li className="hover:text-white cursor-pointer" onClick={() => {
                  navigate("/");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}>Home</li>
                <li className="hover:text-white cursor-pointer" onClick={() => navigate("/bookings")}>Bookings</li>
                <li className="hover:text-white cursor-pointer">Salons</li>
                <li className="hover:text-white cursor-pointer">Contact</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Contact</h2>
              <ul className="space-y-2 text-white/90">
                <li>Email: support@glowandgo.com</li>
                <li>Phone: +91 98765 43210</li>
                <li>Location: Hyderabad, India</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/30 mt-10 pt-6 text-center text-sm text-white/90">
            © 2026 Glow & Go. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
