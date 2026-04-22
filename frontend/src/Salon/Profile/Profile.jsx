import React from 'react'
import ProfileFillCard from "./ProfileFillCard";
import { Divider } from '@mui/material';
import { useSelector } from 'react-redux';

const Profile = () => {
    const { salon, auth } = useSelector(store => store);

    return (
        <div className='lg:px-20 lg:bottom-20 space-y-20'>
            <div className="w-full lg:w-[80%]">
                <h1 className="text-3xl font-bold pb-5">
                    {salon?.salon?.name || "Salon"}
                </h1>

                <section className='grid grid-cols-2 gap-3'>
                    <div className='col-span-2'>
                        <img
                            className='w-full h-[12rem] object-cover rounded-md'
                            src={salon?.salon?.images?.[0] || ""}
                            alt="Salon"
                        />
                    </div>

                    <div className='col-span-1'>
                        <img
                            className='w-full h-[12rem] object-cover rounded-md'
                            src={salon?.salon?.images?.[1] || ""}
                            alt="Salon"
                        />
                    </div>

                    <div className='col-span-1'>
                        <img
                            className='w-full h-[12rem] object-cover rounded-md'
                            src={salon?.salon?.images?.[2] || ""}
                            alt="Salon"
                        />
                    </div>
                </section>
            </div>

            <div className="mt-10 lg:w-[80%]">
                <div className="flex items-center pb-3 justify-between">
                    <h1 className="text-2xl font-bold text-gray-600">Owner Details</h1>
                </div>
                <div>
                    <ProfileFillCard keys={"Owner Name"} value={auth?.user?.fullName} />
                    <Divider />
                    <ProfileFillCard keys={"Owner Email"} value={auth?.user?.email} />
                    <Divider />
                    <ProfileFillCard keys={"ROLE"} value={"SALON_OWNER"} />
                </div>
            </div>

            <div className="mt-10 lg:w-[80%]">
                <div className="flex items-center pb-3 justify-between">
                    <h1 className="text-2xl font-bold text-gray-600">Salon Details</h1>
                </div>
                <div>
                    <ProfileFillCard keys={"Salon Name"} value={salon?.salon?.name || ""} />
                    <Divider />
                    <ProfileFillCard
                        keys={"Salon Address"}
                        value={[salon?.salon?.address, salon?.salon?.city].filter(Boolean).join(", ")}
                    />
                    <Divider />
                    <ProfileFillCard keys={"Phone Number"} value={"+91 " + salon?.salon?.phoneNumber || ""} />
                    <Divider />
                    <ProfileFillCard keys={"Open Time"} value={salon?.salon?.openingTime || ""} />
                    <Divider />
                    <ProfileFillCard keys={"Close Time"} value={salon?.salon?.closingTime || ""} />
                </div>
            </div>
        </div>
    )
}

export default Profile;