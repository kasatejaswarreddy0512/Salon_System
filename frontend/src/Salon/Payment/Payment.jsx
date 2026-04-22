import React from 'react'
import { Card } from '@mui/material';
import { Divider } from '@mui/material';
import { getPriceTotal } from 'src/util/totalEarnings';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchSalonBookings } from 'src/Redux/Booking/action';

const Payment = () => {

    const dispatch = useDispatch();
    const salon = useSelector((store) => store.salon);
    const { booking } = useSelector(store => store);

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");

        if (salon?.salon && jwt) {
            dispatch(fetchSalonBookings(jwt));
        }
    }, [dispatch, salon?.salon]);


    const lastBooking = booking?.bookings
        ?.slice()
        .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))[0];

    return (
        <Card className="rounded-md space-y-4 p-5">
            <h1 className="text-gray-600 font-medium">Total Earning</h1>

            <h1 className="font-bold text-xl pb-1">
                ₹{getPriceTotal(booking?.bookings)}
            </h1>

            <Divider />

            <p>
                Last Payment :{" "}
                <strong>₹{lastBooking?.totalPrices || 0}</strong>
            </p>
        </Card>
    );
}

export default Payment;