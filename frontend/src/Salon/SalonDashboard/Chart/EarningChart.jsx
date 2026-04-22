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
import { fetchEarnings } from 'src/Redux/Chart/action';

const EarningChart = () => {
    const dispatch = useDispatch();
    const { chart } = useSelector((state) => state);

    useEffect(() => {
        dispatch(fetchEarnings(localStorage.getItem("jwt")));
    }, [dispatch]);

    if (chart.earnings.loading) {
        return (
            <Backdrop open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    if (chart.earnings.error) {
        return <div>Error: {chart.earnings.error}</div>;
    }

    return (
        <div style={{ width: '100%', maxWidth: '700px', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={chart.earnings.data || []}
                    margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                    <XAxis dataKey="daily" stroke="#666" />
                    <YAxis width="auto" stroke="#666" />
                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="earnings"
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

export default EarningChart;