import React from 'react'
import { FiberManualRecord } from '@mui/icons-material';
import { Button } from '@mui/material';

const ServiceCard = () => {
    return (
        <div className='w-full'>
            <div className='flex gap-5 items-center justify-between '>
                <div className='space-y-1 w-[50%]'>
                    <h1 className='text-2xl font-semibold'>Man Beard</h1>
                    <p className='text-sm text-gray-500'>Stylish man's beard trim</p>
                    <div className='flex items-center gap-3'>
                        <p> ₹300</p>
                    <FiberManualRecord sx={{ fontSize: '10px', color: 'gray' }} />
                    <p>45 mins</p>
                    </div>
                </div>

                <div className='space-y-3'>
                    <img className='w-full h-20 object-cover rounded-md' src="https://i.pinimg.com/736x/d2/3b/d6/d23bd66dff2665f5e215a20ff32ed0c6.jpg" alt="" />
                    <Button variant='outlined' color='primary' size='small' className='w-full'>
                        Book Now
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ServiceCard;