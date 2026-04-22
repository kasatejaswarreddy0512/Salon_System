import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const NavBar = ({ DrawerList }) => {

    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toggleDrawer = (newOpen) => {
        setOpen(newOpen);
    };



    return (
        <div className="h-[10vh] flex items-center justify-between px-5 border-b">

            {/* Left */}
            <div className="flex items-center gap-3">
                <IconButton onClick={() => toggleDrawer(true)}>
                    <MenuIcon color="primary" />
                </IconButton>

                <h1 className="text-primary text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>
                    Salon Booking
                </h1>
            </div>

            {/* Right */}
            <IconButton>
                <Badge badgeContent={4} color="secondary">
                    <NotificationsActiveIcon color="primary" />
                </Badge>
            </IconButton>

            {/* Drawer */}
            <Drawer
                open={open}
                anchor="left"
                onClose={() => toggleDrawer(false)}
            >

                <DrawerList toggleDrawer={toggleDrawer} />
            </Drawer>

        </div>
    )
}

export default NavBar;
