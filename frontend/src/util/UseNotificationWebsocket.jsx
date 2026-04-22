import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import {
    addNotification,
    fetchNotificationByUser,
    fetchNotificationBySalon
} from 'src/Redux/Notifications/action';

const useNotificationWebsocket = (id, type) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!id || !type) return;

        const jwt = localStorage.getItem("jwt");

        if (type === "user") {
            dispatch(
                fetchNotificationByUser({
                    jwt,
                    userId: id,
                })
            );
        }

        if (type === "salon") {
            dispatch(
                fetchNotificationBySalon({
                    jwt,
                    salonId: id,
                })
            );
        }
    }, [dispatch, id, type]);

    useEffect(() => {
        if (!id || !type) return;

        const socket = new SockJS("http://localhost:9090/api/notifications/ws");
        const stomp = Stomp.over(socket);

        stomp.connect(
            {},
            () => {
                console.log(`Connected to WebSocket for ${type}: ${id}`);

                const subscription = stomp.subscribe(
                    `/notification/${type}/${id}`,
                    (message) => {
                        const receivedNotification = JSON.parse(message.body);
                        console.log("Received notification:", receivedNotification);

                        dispatch(addNotification(receivedNotification));
                    }
                );

                stomp.subscription = subscription;
            },
            (error) => {
                console.error("WebSocket connection error:", error);
            }
        );

        return () => {
            try {
                if (stomp.subscription) {
                    stomp.subscription.unsubscribe();
                }

                if (stomp.connected) {
                    stomp.disconnect(() => {
                        console.log("Disconnected from WebSocket");
                    });
                }
            } catch (error) {
                console.error("WebSocket disconnect error:", error);
            }
        };
    }, [dispatch, id, type]);
};

export default useNotificationWebsocket;