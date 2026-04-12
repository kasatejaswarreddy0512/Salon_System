import React from 'react'
import ProfileFillCard from "./ProfileFillCard";
import { Divider } from '@mui/material';

const Profile = () => {
    return (
        <div className='lg:px-20  lg:bottom-20 space-y-20'>
            <div className="w-full lg:w-[80%] ">
                <h1 className="text-3xl font-bold pb-5">Pablo Salon</h1>
                <section className='grid grid-cols-2 gap-3'>
                    <div className='col-span-2 '>
                        <img className='w-full h-[12rem] object-cover rounded-md' src="https://i.pinimg.com/736x/d2/3b/d6/d23bd66dff2665f5e215a20ff32ed0c6.jpg" alt="" />
                    </div>

                    <div className='col-span-1 '>
                        <img className='w-full h-[12rem] object-cover rounded-md' src="https://i.pinimg.com/736x/d2/3b/d6/d23bd66dff2665f5e215a20ff32ed0c6.jpg" alt="" />
                    </div>

                    <div className='col-span-1 '>
                        <img className='w-full h-[12rem] object-cover rounded-md' src="https://i.pinimg.com/736x/d2/3b/d6/d23bd66dff2665f5e215a20ff32ed0c6.jpg" alt="" />
                    </div>
                </section>
            </div>


            <div className="mt-10 lg:w-[80%]">
                <div className="flex items-center pb-3 justify-between">
                    <h1 className="text-2xl font-bold text-gray-600">Owner Details</h1>

                </div>
                <div>
                    <ProfileFillCard keys={"Owner Name"} value={"Reddy"} />
                    <Divider />
                    <ProfileFillCard keys={"Owner Email"} value={"reddy@gmail.com"} />
                    <Divider />
                    <ProfileFillCard keys={"ROLE"} value={"SALON_OWNER"} />
                </div>
            </div>


            <div className="mt-10 lg:w-[80%]">
                <div className="flex items-center pb-3 justify-between">
                    <h1 className="text-2xl font-bold text-gray-600">Salon Details</h1>

                </div>
                <div>
                    <ProfileFillCard keys={"Salon Name"} value={"Pablo Salon"} />
                    <Divider />
                    <ProfileFillCard keys={"Salon Address"} value={"Ameerpet Hyderabad"} />
                    <Divider />
                    <ProfileFillCard keys={"Open Time"} value={"09:00 AM"} />
                    <Divider />
                    <ProfileFillCard keys={"Close Time"} value={"08:00 PM"} />
                </div>
            </div>
        </div>
    )
}

export default Profile;
