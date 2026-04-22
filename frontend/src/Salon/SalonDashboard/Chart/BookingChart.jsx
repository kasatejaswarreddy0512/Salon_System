import { Backdrop, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import { fetchBookings } from 'src/Redux/Chart/action';

const BookingChart = () => {
    const dispatch = useDispatch();
    const { chart } = useSelector((state) => state);

    useEffect(() => {
        dispatch(fetchBookings(localStorage.getItem("jwt")));
    }, [dispatch]);

    if (chart.bookings.loading) {
        return (
            <Backdrop open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    if (chart.bookings.error) {
        return <div>Error: {chart.bookings.error}</div>;
    }

    return (
        <div style={{ width: '100%', maxWidth: '700px', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={chart.bookings.data || []}
                    margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                    <XAxis dataKey="daily" stroke="#666" />
                    <YAxis width="auto" stroke="#666" />
                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="count"
                        stroke="#22c55e"
                        strokeWidth={2}
                        dot={{ r: 3, fill: '#22c55e' }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BookingChart;