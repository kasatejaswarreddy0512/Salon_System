import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logout } from 'src/Redux/Auth/action';
import UseNotificationWebsocket from 'src/util/UseNotificationWebsocket';

const NavBar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();
    const auth = useSelector((store) => store.auth);
    const notification = useSelector((store) => store.notification);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
            dispatch(getUser(token));
        }
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        handleClose();
        navigate("/login");
    };

    UseNotificationWebsocket(auth.user?.id, "user");

    return (
        <div className='z-50 px-6 flex items-center justify-between py-1 bg-secondary'>
            <div className='flex items-center gap-10'>
                <h1
                    onClick={() => navigate("/")}
                    className='text-2xl font-bold text-primary cursor-pointer'
                >
                    Salon Service
                </h1>

                <div className="flex items-center gap-5">
                    <span className='cursor-pointer' onClick={() => navigate("/")}>
                        Home
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-3 md:gap-6">
                <Button
                    onClick={() => navigate("/become-partner")}
                    variant="outlined"
                    color="primary"
                >
                    Become Partner
                </Button>

                <IconButton onClick={() => navigate("/notifications")}>
                    <Badge badgeContent={notification.unreadCount || 0} color="error">
                        <NotificationsActiveIcon color="primary" />
                    </Badge>
                </IconButton>

                {auth?.user ? (
                    <div className='flex gap-1 items-center cursor-pointer'>
                        <h1 className='font-semibold text-lg'>
                            {auth.user.fullName || auth.user.username || "User"}
                        </h1>

                        <IconButton
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <Avatar sx={{ bgcolor: '#019031' }}>
                                {(auth.user.fullName || auth.user.username || "U")[0]}
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
                            <MenuItem
                                onClick={() => {
                                    navigate("/bookings");
                                    handleClose();
                                }}
                            >
                                My Bookings
                            </MenuItem>

                            {auth.user?.role === "SALON_OWNER" && (
                                <MenuItem
                                    onClick={() => {
                                        navigate("/salon-dashboard");
                                        handleClose();
                                    }}
                                >
                                    Salon Dashboard
                                </MenuItem>
                            )}

                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                ) : (
                    <IconButton color="primary" onClick={() => navigate('/login')}>
                        <AccountCircleIcon sx={{ fontSize: '45px' }} />
                    </IconButton>
                )}
            </div>
        </div>
    );
};

export default NavBar;