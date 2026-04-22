import React, { useEffect, useState } from 'react';
import SalonDetail from './SalonDetail';
import { Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import SalonServiceDetails from './SalonServiceDetails';
import Review from '../../Review/Review';
import CreateReviewForm from '../../Review/CreateReviewForm';

const tabs = [
    { name: 'All Services' },
    { name: 'Reviews' },
    { name: 'Create Review' }
];

const SalonDetails = () => {

    const [activeTab, setActiveTab] = useState(0);

    const handleActiveTab = (tabIndex) => {
        setActiveTab(tabIndex);
    };



    return (
        <div className='px-5 lg:px-20'>
            <SalonDetail />

            <div className='space-y-5'>
                <div className='flex gap-3'>
                    {tabs.map((tab, index) => (
                        <Button
                            key={index}
                            variant={index === activeTab ? "contained" : "outlined"}
                            className='mr-3'
                            onClick={() => handleActiveTab(index)}
                        >
                            {tab.name}
                        </Button>
                    ))}
                </div>
                <Divider />
                <div>
                    {activeTab === 0 && <div><SalonServiceDetails /></div>}
                    {activeTab === 1 && <div><Review /></div>}
                    {activeTab === 2 && <div className='flex justify-center'><CreateReviewForm /></div>}
                </div>
            </div>
        </div>
    );
};

export default SalonDetails;