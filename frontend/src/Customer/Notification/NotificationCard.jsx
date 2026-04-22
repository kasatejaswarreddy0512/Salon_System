import React from 'react'
import { Card } from '@mui/material';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import { useDispatch } from 'react-redux';
import { markNotificationAsRead } from 'src/Redux/Notifications/action';
import { useNavigate } from 'react-router-dom';

const NotificationCard = ({ item }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleReadNotification = () => {
        dispatch(markNotificationAsRead({
            jwt: localStorage.getItem("jwt"),
            notificationId: item.id,

        }))

        navigate("/bookings")
    }

    return (
        <Card
            onClick={handleReadNotification}
            sx={{ bgcolor: item.read? "white": '#EAF0F1' }}
            className='cursor-pointer p-5 flex items-center gap-5 rounded-lg'>

            <NotificationsActiveRoundedIcon sx={{ color: '#0a0a0a', fontSize: '2.5rem' }} />

            <div>
                <p>{item.description}</p>
                <h1 className="space-x-3">
                    {/* {[1, 2, 3].map((num) => (
                    <span key={num}>Hait cut </span>))} */}
                    Salon Id : {item.salonId}
                </h1>
            </div>
        </Card>
    )
}

export default NotificationCard;