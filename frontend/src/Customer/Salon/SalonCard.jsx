import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';

const SalonCard = () => {

    const navigate = useNavigate();

    return (
        <div onClick={() => navigate("/salon/2")} className='cursor-pointer'>
            <div className='w-60 md:w-80 rounded-md bg-slate-100'>
                <img className='w-full h-[15rem] object-cover rounded-t-md' src="https://tse1.mm.bing.net/th/id/OIP.Xn_PhEtwwfNv6Ifj5JyxAAHaLH?w=768&h=1152&rs=1&pid=ImgDetMain&o=7&rm=3" alt="" />
                <div className='p-5 space-y-2'>
                    <h1 className='text-xl font-semibold'>Salon Name</h1>
                    <div className='text-white text-sm p-1 bg-green-700 rounded-full w-16 flex items-center justify-center gap-1'>
                        4.5 <StarIcon sx={{ fontSize: "16px" }} />
                    </div>
                    <p className='text-sm text-slate-900'>Professional hair cut and....</p>
                    <p className='text-sm text-slate-900'>Ameerpet, Hyderabad</p>
                </div>
            </div>
        </div>
    )
}

export default SalonCard;
