import api from "src/Config/api";
import { ADD_NOTIFICATION, FETCH_NOTIFICATIONS_BY_SALON_FAILURE, FETCH_NOTIFICATIONS_BY_SALON_REQUEST, FETCH_NOTIFICATIONS_BY_SALON_SUCCESS, FETCH_NOTIFICATIONS_BY_USER_FAILURE, FETCH_NOTIFICATIONS_BY_USER_REQUEST, FETCH_NOTIFICATIONS_BY_USER_SUCCESS, FETCH_NOTIFICATION_FAILURE, FETCH_NOTIFICATION_REQUEST, FETCH_NOTIFICATION_SUCCESS, MARK_NOTIFICATION_AS_READ_FAILURE, MARK_NOTIFICATION_AS_READ_REQUEST, MARK_NOTIFICATION_AS_READ_SUCCESS } from "./actionType";


const API_URL = "/api/notifications";

export const fetchAllNotifications = () => async (dispatch) => {
    dispatch({ type: FETCH_NOTIFICATION_REQUEST });

    try {
        const response = await api.get(`${API_URL}`);
        dispatch({ type: FETCH_NOTIFICATION_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_NOTIFICATION_FAILURE, payload: error.message });
    }
}


export const fetchNotificationByUser = ({ userId, jwt }) => async (dispatch) => {
    dispatch({ type: FETCH_NOTIFICATIONS_BY_USER_REQUEST });

    try {
        const response = await api.get(`${API_URL}/user/${userId}`,
            {
                headers: { Authorization: `Bearer ${jwt}` },
            }
        );
        console.log("fetch notification ", response.data);
        dispatch({ type: FETCH_NOTIFICATIONS_BY_USER_SUCCESS, payload: response.data });
    } catch (error) {
        console.log("error fetching notification  ", error);
        dispatch({ type: FETCH_NOTIFICATIONS_BY_USER_FAILURE, payload: error.message });
    }
}


export const fetchNotificationBySalon = ({ salonId, jwt }) => async (dispatch) => {
    dispatch({ type: FETCH_NOTIFICATIONS_BY_SALON_REQUEST });

    try {
        const response = await api.get(`${API_URL}/salon-owner/salon/${salonId}`,
            {
                headers: { Authorization: `Bearer ${jwt}` },
            }
        );
        console.log("fetch salon notification ", response.data);
        dispatch({ type: FETCH_NOTIFICATIONS_BY_SALON_SUCCESS, payload: response.data });
    } catch (error) {
        console.log("error fetching notification  ", error);
        dispatch({ type: FETCH_NOTIFICATIONS_BY_SALON_FAILURE, payload: error.message });
    }
}


export const markNotificationAsRead = ({ notificationId, jwt }) => async (dispatch) => {
    dispatch({ type: MARK_NOTIFICATION_AS_READ_REQUEST });

    try {
        const response = await api.get(`${API_URL}/${notificationId}/read`,
            {
                headers: { Authorization: `Bearer ${jwt}` },
            }
        );
        console.log("mark notification read", response.data);
        dispatch({ type: MARK_NOTIFICATION_AS_READ_SUCCESS, payload: response.data });
    } catch (error) {
        console.log("mark notification as read error ", error);
        dispatch({ type: MARK_NOTIFICATION_AS_READ_FAILURE, payload: error.message });
    }
}


export const addNotification = (notification) => {
    return {
        type: ADD_NOTIFICATION,
        payload: notification,
    }
}