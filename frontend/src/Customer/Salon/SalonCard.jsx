import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';

const SalonCard = ({ item }) => {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/salon/${item?.id}`)} className='cursor-pointer'>
            <div className='w-60 md:w-80 rounded-md bg-slate-100'>
                <img
                    className='w-full h-[15rem] object-cover rounded-t-md'
                    src={item?.images?.[0] || "https://via.placeholder.com/300x200?text=No+Image"}
                    alt={item?.name || "Salon"}
                />
                <div className='p-5 space-y-2'>
                    <h1 className='text-xl font-semibold'>
                        {item?.name || "Salon Name"}
                    </h1>

                    <div className='text-white text-sm p-1 bg-green-700 rounded-full w-16 flex items-center justify-center gap-1'>
                        {item?.rating || 4.5} <StarIcon sx={{ fontSize: "16px" }} />
                    </div>

                    <p className='text-sm text-slate-900'>
                        {item?.description || "Professional hair cut and...."}
                    </p>

                    <p className='text-sm text-slate-900'>
                        {item?.address || item?.location || "Ameerpet, Hyderabad"}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SalonCard;