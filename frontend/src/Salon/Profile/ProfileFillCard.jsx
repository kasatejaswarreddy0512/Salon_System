import React from 'react'
import { Divider } from '@mui/material';

const ProfileFillCard = ({ value, keys }) => {
    return (
        <div className='p-2 flex  items-center bg-slate-50'>
            <p className="w-20 lg:w-36 pr-5">{keys}</p>
            <Divider flexItem orientation='vertical' />
            <p className="pl-4 lg:p-2 font-semibold lg:text-lg">{value}</p>
        </div>
    )
}

export default ProfileFillCard;
