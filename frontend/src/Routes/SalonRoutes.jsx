import React from 'react'
import { Route, Routes as Rourtes } from 'react-router-dom';
import HomePage from '../Salon/Home/HomePage';
import CreateServiceForm from '../Salon/Services/CreateServiceForm';
import Notifications from '../Customer/Notification/Notifications';
import Payment from '../Salon/Payment/Payment';
import BookingTable from '../Salon/Booking/BookingTable';
import ServiceTable from '../Salon/Services/ServiceTable';
import TransactionTable from '../Salon/Transaction/TransactionTable';
import Category from '../Salon/Category/Category';
import Profile from '../Salon/Profile/Profile';


const SalonRoutes = () => {
    return (
        <div>
            <Rourtes>
                <Route path='/' element={<HomePage />} />
                <Route path='/services' element={<ServiceTable />} />
                <Route path='/add-services' element={<CreateServiceForm />} />
                <Route path='/payment' element={<Payment />} />
                <Route path='/bookings' element={<BookingTable />} />
                <Route path='/category' element={<Category />} />
                <Route path='/transactions' element={<TransactionTable />} />
                <Route path="/notification" element={<Notifications />} />
                <Route path="/account" element={<Profile />} />
            </Rourtes>
        </div>
    )
}

export default SalonRoutes;