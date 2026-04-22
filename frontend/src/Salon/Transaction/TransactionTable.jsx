import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSalonBookings } from 'src/Redux/Booking/action';
import { useEffect } from 'react';

export default function TransactionTable() {
    const { booking, salon } = useSelector((store) => store);
    const dispatch = useDispatch();

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");

        if (salon?.salon && jwt) {
            dispatch(fetchSalonBookings(jwt));
        }
    }, [dispatch, salon?.salon]);

    return (
        <>
            <h1 className="text-xl font-bold mb-4 pb-5">Transactions</h1>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align="right">Customer Details</TableCell>
                            <TableCell align="right">Booking</TableCell>
                            <TableCell align="right">Amount</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {booking?.bookings?.map((item) => (
                            <TableRow
                                key={item.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {item.startTime?.split("T")[0]}
                                </TableCell>

                                <TableCell align="right">
                                    <p>Full Name: {item.user?.fullName}</p>
                                    <p>Email: {item.user?.email}</p>
                                </TableCell>

                                <TableCell align="right">{item.id}</TableCell>
                                <TableCell align="right">₹{item.totalPrices}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}