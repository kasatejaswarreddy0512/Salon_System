import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomerBookings } from 'src/Redux/Booking/action';
import { store } from 'src/Redux/Store';
import BookingCard from './BookingCard';

const Bookings = () => {

    const dispatch = useDispatch();
    const { booking } = useSelector(store => store);

    useEffect(() => {
        dispatch(fetchCustomerBookings(localStorage.getItem("jwt")));
    }, [])

    return (
        <div className='px-5 md:flex flex-col items-center mt-10 min-h-screen'>
            <div>
                <h1 className='text-3xl font-bold py-5'>My Bookings</h1>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full'>
                {booking.bookings.map((item) => <BookingCard item={item} />)}
            </div>
        </div>
    )
}

export default Bookings;