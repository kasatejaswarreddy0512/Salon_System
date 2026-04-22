import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchSalonBookings } from 'src/Redux/Booking/action';
import { Button } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function BookingTable() {

  const dispatch = useDispatch();
  const salon = useSelector((store) => store.salon);
  const { booking } = useSelector(store => store);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (salon?.salon && jwt) {
      dispatch(fetchSalonBookings(jwt));
    }
  }, [dispatch, salon?.salon]);


  return (
    <>
      <h1 className="text-xl font-bold mb-4 pb-5">Bookings</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Services</StyledTableCell>
              <StyledTableCell align="center">Time & Date</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Customer</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Cancel</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {booking.bookings.map((booking) => (
              <StyledTableRow key={booking.name}>
                <StyledTableCell component="th" scope="row">
                  {booking.services.map((service) => <li>
                    {service.name}
                  </li>)}
                </StyledTableCell>
                <StyledTableCell align="center">{booking.startTime.split("T")[0]}  {booking.startTime.split("T")[1]}</StyledTableCell>
                <StyledTableCell align="center">₹{booking.totalPrices}</StyledTableCell>
                <StyledTableCell className='space-y-2' align="left">
                  <p>Full Name: {booking?.user?.fullName}</p>
                  <p>Email: {booking.user?.email}</p>
                </StyledTableCell>
                <StyledTableCell align="center">{booking.status}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button color='error'>Cancel</Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
