import React from 'react'
import { Card } from '@mui/material';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';

const NotificationCard = () => {
    return (
        <Card sx={{ bgcolor: '#EAF0F1' }}
            className='cursor-pointer p-5 flex items-center gap-5 rounded-lg'>

            <NotificationsActiveRoundedIcon sx={{ color: '#0a0a0a', fontSize: '2.5rem' }} />

            <div>
                <p>You Booking is confirmed</p>
                <h1 className="space-x-3">{[1, 2, 3].map((num) => (
                    <span key={num}>Hait cut </span>
                ))}</h1>
            </div>
        </Card>
    )
}

export default NotificationCard;