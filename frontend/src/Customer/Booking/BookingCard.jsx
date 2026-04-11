import React from 'react'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Button } from '@mui/material';


const BookingCard = () => {
    return (
        <div className='p-5 rounded-md bg-slate-100 md:flex  items-center justify-between'>
            <div className='space-y-2'>
                <h2 className='text-2xl font-bold'>Salon Name</h2>
                <div>
                    <li>Haircut</li>
                    <li>Massage therapy</li>
                    <li>Hair Color</li>
                </div>
                <div>
                    <p>Time & Date <ArrowRightAltIcon /> 2023-10-15 </p>
                    <p>10:00 AM - 11:00 AM</p>
                </div>
            </div>
            <div className="space-y-2">
                <img src="https://wallpapers.com/images/hd/relaxing-back-massage-040s7w89zft4mvzu.jpg" alt="Salon" className='w-28 h-28 rounded-md' />
                <p className='text-center'>₹1000</p>
                <Button variant="outlined" color="error">
                    Cancelled
                </Button>
            </div>
        </div>
    )
}

export default BookingCard;