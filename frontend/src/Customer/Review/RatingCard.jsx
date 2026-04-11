import React from 'react'
import Rating from '@mui/material/Rating';
import { Box } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

const RatingCard = () => {
    return (
        <div className="border p-5 rounded-md w-full">

            <div className="flex items-center space-x-4 pb-6">
                <Rating readOnly value={4.5} precision={0.5} size="small" />
                <p className="opacity-60">8909</p>
            </div>

            <Box className="space-y-4">

                {/* Row */}
                <div className="flex items-center justify-between">
                    <p className="w-[120px]">Excellent</p>

                    <LinearProgress
                        variant="determinate"
                        color="success"
                        value={90}
                        sx={{ bg: "#d0d0d0", height: 10, borderRadius: 4, width: '200px' }}
                    />

                    <p className="opacity-50 w-[70px] text-right">12997</p>
                </div>

                <div className="flex items-center justify-between">
                    <p className="w-[120px]">Very Good</p>

                    <LinearProgress
                        variant="determinate"
                        color="success"
                        value={70}
                        sx={{ bg: "#d0d0d0", height: 10, borderRadius: 4, width: '200px' }}
                    />

                    <p className="opacity-50 w-[70px] text-right">11997</p>
                </div>

                <div className="flex items-center justify-between">
                    <p className="w-[120px]">Good</p>

                    <LinearProgress
                        variant="determinate"
                        color="warning"
                        value={60}
                        sx={{ bg: "#d0d0d0", height: 10, borderRadius: 4, width: '200px' }}
                    />

                    <p className="opacity-50 w-[70px] text-right">12997</p>
                </div>

                <div className="flex items-center justify-between">
                    <p className="w-[120px]">Average</p>

                    <LinearProgress
                        variant="determinate"
                        color="error"
                        value={50}
                        sx={{ bg: "#d0d0d0", height: 10, borderRadius: 4, width: '200px' }}
                    />

                    <p className="opacity-50 w-[70px] text-right">12997</p>
                </div>

                <div className="flex items-center justify-between">
                    <p className="w-[120px]">Poor</p>

                    <LinearProgress
                        variant="determinate"
                        color="error"
                        value={40}
                        sx={{ bg: "#d0d0d0", height: 10, borderRadius: 4, width: '200px' }}
                    />

                    <p className="opacity-50 w-[70px] text-right">12997</p>
                </div>

            </Box>

        </div>
    )
}

export default RatingCard;