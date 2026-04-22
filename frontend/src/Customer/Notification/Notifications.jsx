import React from 'react';
import { useSelector } from 'react-redux';
import NotificationCard from './NotificationCard';

const Notifications = ({ type }) => {
    const notification = useSelector((store) => store.notification);

    return (
        <div className='px-5 md:flex flex-col items-center mt-10 min-h-screen'>
            <div>
                <h1 className='text-3xl font-bold py-5'>
                    {type === "salon" ? "Salon Notifications" : "Notifications"}
                </h1>
            </div>

            <div className='space-y-5 md:w-[35rem]'>
                {notification?.notifications?.length > 0 ? (
                    notification.notifications.map((item) => (
                        <NotificationCard key={item.id} item={item} />
                    ))
                ) : (
                    <p className="text-gray-500">No notifications found.</p>
                )}
            </div>
        </div>
    );
};

export default Notifications;