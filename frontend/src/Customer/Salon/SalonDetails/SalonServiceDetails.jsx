import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import Divider from '@mui/material/Divider';
import { RemoveShoppingCart } from '@mui/icons-material';
import { ShoppingCart } from '@mui/icons-material';
import { Button, Modal } from '@mui/material';
import SelectServiceList from './SelectServiceList';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceBySalonId } from 'src/Redux/SalonService/action';
import ServiceCard from './ServiceCard';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { width } from '@mui/system';
import { createBooking } from 'src/Redux/Booking/action';

const SalonServiceDetails = () => {
    const dispatch = useDispatch();


    const { service, category } = useSelector(store => store);
    const { id } = useParams();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [bookingData, setBookingData] = useState({
        services: [],
        time: null,
    });
    const [open, setOpen] = useState(false);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category.id);
    };

    const handleSelectService = (service) => {
        setBookingData(
            prevState => (
                {
                    ...prevState, services: [...prevState.services, service]
                }))
    }

    const handleRemoveService = (id) => {
        setBookingData(prevState => (
            { ...prevState, services: prevState.services.filter(service => service?.id !== id) }))
    }

    const handleModelClose = () => setOpen(false);
    const handleOpenModel = () => setOpen(true);


    useEffect(() => {
        dispatch(fetchServiceBySalonId({
            salonId: id,
            jwt: localStorage.getItem("jwt"),
            categoryId: selectedCategory,
        }));
    }, [id, selectedCategory, dispatch]);

    const handleBooking = () => {
        const serviceIds = bookingData.services.map((service) => service.id);
        dispatch(createBooking({
            jwt: localStorage.getItem("jwt"),
            salonId: id,
            bookingData: { serviceIds, startTime: bookingData.time }
        }))
    }



    const filteredServices = selectedCategory
        ? service?.services?.filter((item) => item.categoryId === selectedCategory)
        : service?.services;

    return (
        <div className='lg:flex gap-5 h-[90vh] mt-10'>
            <section className='space-y-2 border-r lg:w-[25%] pr-5 '>
                {category?.categories?.map((item) => (
                    <CategoryCard
                        key={item.id}
                        handleCategoryClick={() => handleCategoryClick(item)}
                        selectedCategory={selectedCategory}
                        item={item}
                    />
                ))}
            </section>

            <section className='lg:w-[50%] px-5 space-y-2 lg:px-20 overflow-y-auto '>
                {filteredServices?.map((item) => (
                    <div className='space-y-3' key={item.id}>
                        <ServiceCard
                            onSelect={handleSelectService}
                            onRemove={handleRemoveService}
                            item={item} />
                        <Divider />
                    </div>
                ))}
            </section>

            <section className='lg:w-[25%] '>
                <div className='border rounded-md p-5' >
                    {true ? (
                        <div>
                            <div className='flex items-center gap-2'>
                                <ShoppingCart sx={{ fontSize: '30px', color: 'green' }} />
                                <h1 className='font-thin text-sm'>Selected Services</h1>
                            </div>

                            <SelectServiceList selectedServices={bookingData.services} onRemove={handleRemoveService} />

                            <Button
                                onClick={handleOpenModel}
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

            <Modal open={open} onClose={handleModelClose} >
                <div className='absolute top-[180px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] lg:w-[600px] bg-secondary shadow-lg lg:flex gap-5 p-4 rounded-lg' >
                    <div className='w-[50%] border-r pr-5'>
                        <h1 className='text-xl font-semibold'>Time Slot Not Available</h1>
                    </div>
                    <div className='space-y-5'>
                        <SelectServiceList
                            onRemove={handleRemoveService}
                            selectedServices={bookingData.services} />
                        <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                sx={{ width: "100%" }}
                                fullWidth
                                onChange={(value) => {
                                    if (value) {
                                        const localDate = value.format("YYYY-MM-DDTHH:mm:ss");
                                        setBookingData((prevState) => ({
                                            ...prevState, time: localDate,
                                        }));
                                    }
                                }}

                                label="Select Time Slot"
                            />
                        </LocalizationProvider>
                        <div>
                            <Button fullWidth variant='outlined' onClick={handleBooking}>Book</Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default SalonServiceDetails;