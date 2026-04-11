import React, { useState } from 'react';
import CategoryCard from './CategoryCard';
import SrviceCard from './ServiceCard';
import Divider from '@mui/material/Divider';
import { RemoveShoppingCart } from '@mui/icons-material';
import { ShoppingCart } from '@mui/icons-material';
import { Button } from '@mui/material';
import SelectServiceList from './SelectServiceList';


const SalonServiceDetails = () => {

    const [selectedCategory, setSelectedCategory] = useState(0);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div className='lg:flex gap-5 h-[90vh] mt-10'>
            <section className='space-y-2 border-r lg:w-[25%] pr-5 '>
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <CategoryCard
                        key={item}
                        handleCategoryClick={() => handleCategoryClick(item)}
                        selectedCategory={selectedCategory}
                        item={item}
                    />
                ))}
            </section>

            <sectionn className='lg:w-[50%] px-5 space-y-2 lg:px-20 overflow-y-auto '>
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div className='space-y-3' >
                        <SrviceCard />
                        <Divider />
                    </div>
                ))}
            </sectionn>

            <section className='lg:w-[25%] '>
                <div className='border rounded-md p-5' >

                    {true ? (
                        <div>
                            <div className='flex items-center gap-2'>
                                <ShoppingCart sx={{ fontSize: '30px', color: 'green' }} />
                                <h1 className='font-thin text-sm'>Selected Services</h1>
                            </div>

                            <SelectServiceList />

                            <Button
                                sx={{ py: '0.7rem' }}
                                fullWidth
                                variant='contained'
                                color='primary'
                                size='small'
                                className='ml-auto'
                            >
                                Book Now
                            </Button>
                        </div>
                    ) : (
                        <div className='flex flex-col gap-3 items-center justify-center'>
                            <RemoveShoppingCart sx={{ fontSize: '30px', color: 'green' }} />
                            <h1>Not Selected</h1>
                        </div>
                    )}
                </div>
            </section>

        </div>
    );
};

export default SalonServiceDetails;