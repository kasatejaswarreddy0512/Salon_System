import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCategoriesBySalon } from 'src/Redux/Category/action';
import { fetchSalonById } from 'src/Redux/Salon/action';

const SalonDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { salon } = useSelector(store => store);

    useEffect(() => {
        if (id) {
            dispatch(fetchSalonById({ salonId: id }));
            dispatch(getCategoriesBySalon({
                jwt: localStorage.getItem("jwt"),
                salonId: id
            }))
        }
    }, [dispatch, id]);

    if (!salon?.salon) {
        return <div>Loading...</div>;
    }

    return (
        <div className='space-y-5 mb-20'>
            <section className='grid grid-cols-2 gap-3'>
                <div className='col-span-2'>
                    <img
                        className='w-full h-[15rem] object-cover rounded-md'
                        src={salon?.salon?.images?.[0]}
                        alt="salon"
                    />
                </div>

                <div className='col-span-1'>
                    <img
                        className='w-full h-[15rem] object-cover rounded-md'
                        src={salon?.salon?.images?.[1]}
                        alt="salon"
                    />
                </div>

                <div className='col-span-1'>
                    <img
                        className='w-full h-[15rem] object-cover rounded-md'
                        src={salon?.salon?.images?.[2]}
                        alt="salon"
                    />
                </div>
            </section>

            <section className='space-y-3'>
                <h1 className='text-3xl font-bold'>
                    {salon?.salon?.name}
                </h1>
                <p>{salon?.salon?.address}</p>
                <p>
                    <strong>Timings:</strong> {salon?.salon?.openingTime} To {salon?.salon?.closingTime}
                </p>
            </section>
        </div>
    )
}

export default SalonDetail