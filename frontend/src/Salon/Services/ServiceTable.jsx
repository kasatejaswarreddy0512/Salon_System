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
import { fetchServiceBySalonId } from 'src/Redux/SalonService/action';
import { IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { getCategoriesBySalon } from 'src/Redux/Category/action';


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

export default function ServiceTable() {

  const dispatch = useDispatch();
  const { salon, service } = useSelector((store) => store)

  useEffect(() => {
    if (salon.salon) {
      dispatch(fetchServiceBySalonId({
        salonId: salon.salon.id,
        jwt: localStorage.getItem("jwt"),
        CategoryId: null
      }))
    }
  }, [salon.salon])



  return (
    <>
      <h1 className="text-xl font-bold mb-4 pb-5">Services</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell align="center">Title</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Update</StyledTableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {service.services.map((service) => (
              <StyledTableRow key={service.name}>
                <StyledTableCell component="th" scope="row">
                  <div className='flex  gap-1 flex-wrap items-center'>
                    <img className="w-20 h-20 rounded-md object-cover"
                      src={service?.image} alt="Service" />
                  </div>
                </StyledTableCell>
                <StyledTableCell align="center">{service.name}</StyledTableCell>
                <StyledTableCell align="center">{service.price}</StyledTableCell>
                <StyledTableCell className='space-y-2' align="center">
                  <IconButton>
                    <Edit />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
