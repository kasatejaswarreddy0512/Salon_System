import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from '../Customer/Home/Home';
import Bookings from '../Customer/Booking/Bookings';
import Notifications from '../Customer/Notification/Notifications';
import SalonDeatils from '../Customer/Salon/SalonDetails/SalonDetails';
import NavBar from '../Customer/Navbar/NavBar';
import NotFound from '../NotFound/NotFound';

const CustomerRoutes = () => {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/salon/:id" element={<SalonDeatils />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    )
}

export default CustomerRoutes
