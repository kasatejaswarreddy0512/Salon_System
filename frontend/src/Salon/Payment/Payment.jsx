import React from 'react'
import { Card } from '@mui/material';
import { Divider } from '@mui/material';

const Payment = () => {
    return (
        <div className="">
            <div className="">
                <Card className="rounded-md space-y-4 p-5">
                    <h1 className="text-gray-600 font-medium">Total Earning</h1>
                    <h1 className="font-bold text-xl pb-1">₹909909</h1>
                    <Divider />
                    <p>Last Payment : <strong>₹600</strong></p>
                </Card>
            </div>

        </div>
    )
}

export default Payment;