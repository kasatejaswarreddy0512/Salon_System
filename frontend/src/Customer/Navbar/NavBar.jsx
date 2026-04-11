import React from 'react'
import { Button } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className='z-50 px-6 flex items-center justify-between py-1'>

            <div className='flex items-center gap-10'>
                <h1 onClick={() => navigate("/")} className='text-2xl font-bold text-green-500 cursor-pointer'>
                    Salon Service
                </h1>

                <div className="flex items-center gap-5">
                    <span>Home</span>
                </div>
            </div>

            <div className="flex items-center gap-3 md:gap-6">

                <Button variant="outlined" color="primary">
                    Become Partner
                </Button>

                <IconButton onClick={() => navigate("/notifications")}>
                    <Badge badgeContent={6} color="error">
                        <NotificationsActiveIcon color="primary" />
                    </Badge>
                </IconButton>

                {true ? <div className='flex gap-1 items-center cursor-pointer'>
                    <h1 className='font-semibold text-lg'>Code with Reddy</h1>

                    <IconButton
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <Avatar sx={{ bgcolor: 'green' }}>
                            R
                        </Avatar>
                    </IconButton>

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={() => navigate("/bookings")}>My Bookings</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>

                </div> :


                    <IconButton color="primary">
                        <AccountCircleIcon sx={{ fontSize: '45px', color: 'primary' }} />
                    </IconButton>}
            </div>

        </div>
    )
}

export default NavBar;