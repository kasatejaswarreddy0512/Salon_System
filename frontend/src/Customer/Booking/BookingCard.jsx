import React from 'react'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Button } from '@mui/material';


const BookingCard = ({ item }) => {
    return (
        <div className='p-5 rounded-md bg-slate-100 md:flex  items-center justify-between'>
            <div className='space-y-2'>
                <h2 className='text-2xl font-bold'>{item.salon.name}</h2>
                <div>
                    {item.services.map((service) => <li>{service.name}</li>)}

                </div>
                <div>
                    <p>Time & Date <ArrowRightAltIcon /> {item.startTime.split("T")[0]} </p>
                    <p>{item.startTime.split("T")[1]} - {item.endTime.split("T")[1]}</p>
                </div>
            </div>
            <div className="space-y-2">
                <img src={item.services[0].image} alt="Salon" className='w-28 h-28 rounded-md' />
                <p className='text-center'>₹{item.totalPrices}</p>
                <Button variant="outlined" color="error">
                    Cancelled
                </Button>
            </div>
        </div>
    )
}

export default BookingCard;