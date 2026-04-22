import { AccountBalance } from '@mui/icons-material'
import React from 'react'
import BookingChart from './Chart/BookingChart'
import EarningChart from './Chart/EarningChart'
import ReportCard from './ReportCard'

const HomePage = () => {

    return (
        <div className="space-y-5 ">
            <div className="lg:flex gap-5">

                <div className=" space-y-10 rounded-md w-full lg:w-[70%]">
                    <div className=' border rounded-lg p-5 w-full  '>
                        <h1 className='text-lg font-bold pb-5 text-primary'>Total Revenue</h1>
                        <EarningChart />
                    </div>
                </div>

                <section className='space-y-5 w-full lg:w-[30%] '>
                    <ReportCard
                        icon={<AccountBalance />}
                        value={"₹" + 890}
                        title={"Total Earnings"}
                    />

                    <ReportCard
                        icon={<AccountBalance />}
                        value={"₹" + 890}
                        title={"Total Bookings"}
                    />

                    <ReportCard
                        icon={<AccountBalance />}
                        value={"₹" + 890}
                        title={"Total Refund"}
                    />

                    <ReportCard
                        icon={<AccountBalance />}
                        value={"₹" + 890}
                        title={"Cancel Bookings"}
                    />
                </section>
            </div>
            <div className='space-y-10 rounded-md w-full'>
                <div className='border rounded-lg p-5 w-full'>
                    <h1 className='text-lg font-bold pb-5 text-primary'>Total Booking Chart</h1>
                    <BookingChart />
                </div>
            </div>
        </div>
    )
}

export default HomePage