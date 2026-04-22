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
import { store } from 'src/Redux/Store';
import { getCategoriesBySalon } from 'src/Redux/Category/action';
import { IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';

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

export default function CategoryTable() {

    const dispatch = useDispatch();
    const { salon, category } = useSelector(store => store);

    useEffect(() => {
        if (salon.salon) {
            dispatch(getCategoriesBySalon({
                jwt: localStorage.getItem("jwt"),
                salonId: salon?.salon?.id
            }))
        }
    }, [salon.salon])

    return (
        <>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Image</StyledTableCell>
                            <StyledTableCell align="center">Title</StyledTableCell>
                            <StyledTableCell align="center">Update</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {category.categories.map((item) => (
                            <StyledTableRow key={item.name}>
                                <StyledTableCell component="th" scope="row">
                                    <div className='flex  gap-1 flex-wrap items-center'>
                                        <img className="w-22 h-16 rounded-md object-cover" src={item?.image} alt="Service" />
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell align="center" sx={{ fontWeight: "bold" }}>
                                    {item?.name}
                                </StyledTableCell>
                                <StyledTableCell align="center">
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
