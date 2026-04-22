import React from 'react'
import { FiberManualRecord } from '@mui/icons-material';
import { Button } from '@mui/material';

const ServiceCard = ({ item, onSelect, onRemove }) => {
    return (
        <div className='w-full'>
            <div className='flex gap-5 items-center justify-between '>
                <div className='space-y-1 w-[50%]'>
                    <h1 className='text-2xl font-semibold'>{item.name}</h1>
                    <p className='text-sm text-gray-500'>{item.description}</p>
                    <div className='flex items-center gap-3'>
                        <p> ₹ {item.price}</p>
                        <FiberManualRecord sx={{ fontSize: '10px', color: 'gray' }} />
                        <p>{item.duration}mins</p>
                    </div>
                </div>

                <div className='space-y-3'>
                    <img className='w-[100px] h-20 object-cover rounded-md'
                        src={item?.image} alt="" />
                    <Button onClick={() => onSelect(item)} variant='outlined' color='primary' size='small' className='w-full'>
                        Book Now
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ServiceCard;