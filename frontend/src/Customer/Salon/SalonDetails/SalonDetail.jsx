import React from 'react'

const SalonDetail = () => {
    return (
        <div className='space-y-5 mb-20 '>
            <section className='grid grid-cols-2 gap-3'>
                <div className='col-span-2 '>
                    <img className='w-full h-[15rem] object-cover rounded-md' src="https://i.pinimg.com/736x/d2/3b/d6/d23bd66dff2665f5e215a20ff32ed0c6.jpg" alt="" />
                </div>

                <div className='col-span-1 '>
                    <img className='w-full h-[15rem] object-cover rounded-md' src="https://i.pinimg.com/736x/d2/3b/d6/d23bd66dff2665f5e215a20ff32ed0c6.jpg" alt="" />
                </div>

                <div className='col-span-1 '>
                    <img className='w-full h-[15rem] object-cover rounded-md' src="https://i.pinimg.com/736x/d2/3b/d6/d23bd66dff2665f5e215a20ff32ed0c6.jpg" alt="" />
                </div>
            </section>

            <section className='space-y-3'>
                <h1 className='text-3xl font-bold'>Salon Name</h1>
                <p>Ameerpet Hyderabad</p>
                <p><strong>Timings:</strong> 9:00 AM - 8:00 PM</p>
            </section>

            

        </div>
    )
}

export default SalonDetail