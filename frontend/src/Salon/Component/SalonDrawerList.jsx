import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddIcon from '@mui/icons-material/Add';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CategoryIcon from '@mui/icons-material/Category';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import DrawerList from '../../AdminSalon/DrawerList';
import { useDispatch } from 'react-redux';
import { logout } from 'src/Redux/Auth/action';

const menu = [
    {
        name: "Dashboard",
        path: "/salon-dashboard",
        icon: <DashboardIcon className="text-primary" />,
        activeIcon: <DashboardIcon className="text-secondary" />,
    },
    {
        name: "Bookings",
        path: "/salon-dashboard/bookings",
        icon: <ShoppingBagIcon className="text-primary" />,
        activeIcon: <ShoppingBagIcon className="text-secondary" />,
    },
    {
        name: "Services",
        path: "/salon-dashboard/services",
        icon: <InventoryIcon className="text-primary" />,
        activeIcon: <InventoryIcon className="text-secondary" />,
    },
    {
        name: "Add Services",
        path: "/salon-dashboard/add-services",
        icon: <AddIcon className="text-primary" />,
        activeIcon: <AddIcon className="text-secondary" />,
    },
    {
        name: "Payment",
        path: "/salon-dashboard/payment",
        icon: <AccountBalanceWalletIcon className="text-primary" />,
        activeIcon: <AccountBalanceWalletIcon className="text-secondary" />,
    },
    {
        name: "Transactions",
        path: "/salon-dashboard/transactions",
        icon: <ReceiptIcon className="text-primary" />,
        activeIcon: <ReceiptIcon className="text-secondary" />,
    },
    {
        name: "Category",
        path: "/salon-dashboard/category",
        icon: <CategoryIcon className="text-primary" />,
        activeIcon: <CategoryIcon className="text-secondary" />,
    },
    {
        name: "Notification",
        path: "/salon-dashboard/notification",
        icon: <NotificationsNoneIcon className="text-primary" />,
        activeIcon: <NotificationsIcon className="text-secondary" />,
    },
];

const menu2 = [
    {
        name: "Account",
        path: "/salon-dashboard/account",
        icon: <AccountBoxIcon className="text-primary" />,
        activeIcon: <AccountBoxIcon className="text-secondary" />,
    },
    {
        name: "Logout",
        action: "logout",
        icon: <LogoutIcon className="text-primary" />,
        activeIcon: <LogoutIcon className="text-secondary" />,
    },
];

const SalonDrawerList = ({ toggleDrawer }) => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem("jwt");
        dispatch(logout());

        if (toggleDrawer) {
            toggleDrawer(false);
        }

        window.location.href = "/login";
    };

    return (
        <DrawerList
            menu={menu}
            menu2={menu2}
            toggleDrawer={toggleDrawer}
            onLogout={handleLogout}
        />
    );
};

export default SalonDrawerList;

