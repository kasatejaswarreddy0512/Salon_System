import React from 'react'
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

const SelectServiceList = () => {
    return (
        <div className='my-5 space-y-2' >
            {[1, 2, 3, 4, 5, 6].map((item) => (
                <div className='py-2 px-4 rounded-md bg-slate-100 flex justify-between items-center' >
                    <h1 className='font-thin'>Man Beared</h1>
                    <p>₹399</p>
                    <IconButton size='small' color='error'>
                        <Close />
                    </IconButton>
                </div>
            ))}

        </div>

    )
}

export default SelectServiceList;