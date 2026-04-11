import React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useNavigate, useLocation } from "react-router-dom";

const DrawerList = ({ menu, menu2, toggleDrawer }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (item) => {
        navigate(item.path);
        if (toggleDrawer) {
            toggleDrawer(false);
        }
    };

    // console.log("location.pathname:", location);

    return (
        <div>
            <div className="flex flex-col justify-between h-full w-[290px] border-r py-2">

                {/* Top Menu */}
                <div className="space-y-2">
                    {menu.map((item, index) => {
                        const isActive = location.pathname === item.path;

                        return (
                            <div key={index} onClick={() => handleClick(item)} className="pr-9">
                                <div
                                    className={`flex items-center gap-3 px-5 py-2 cursor-pointer rounded-r-full
                                    ${isActive ? "bg-primary text-secondary" : "text-primary hover:bg-gray-100"}
                                    `}
                                >
                                    <ListItemIcon>
                                        {isActive ? item.activeIcon : item.icon}
                                    </ListItemIcon>

                                    <ListItemText primary={item.name} />
                                </div>
                            </div>
                        );
                    })}
                </div>

                <Divider sx={{ marginTop: "6px" }} />

                {/* Bottom Menu */}
                <div className="space-y-2 mt-2">
                    {menu2.map((item, index) => {
                        const isActive = location.pathname === item.path;

                        return (
                            <div key={index} onClick={() => handleClick(item)} className="pr-9">
                                <div
                                    className={`flex items-center gap-3 px-5 py-2 cursor-pointer rounded-r-full
                                    ${isActive ? "bg-primary text-secondary" : "text-primary hover:bg-gray-100"}
                                    `}
                                >
                                    <ListItemIcon>
                                        {isActive ? item.activeIcon : item.icon}
                                    </ListItemIcon>

                                    <ListItemText primary={item.name} />
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
};

export default DrawerList;