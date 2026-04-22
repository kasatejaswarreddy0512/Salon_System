import api from "src/Config/api";
import { FETCH_SALON_BY_ID_FAILURE } from "../Salon/actionTypes";
import { CREATE_BOOKINGS_FAILURE, CREATE_BOOKINGS_REQUEST, CREATE_BOOKINGS_SUCCESS, FECTH_CUSTOMER_BOOKINGS_FAILURE, FECTH_CUSTOMER_BOOKINGS_REQUEST, FECTH_CUSTOMER_BOOKINGS_SUCCESS, FETCH_BOOKING_BY_ID_REQUEST, FETCH_BOOKING_BY_ID_SUCCESS, FETCH_SALON_BOOKINGS_FAILURE, FETCH_SALON_BOOKINGS_REQUEST, FETCH_SALON_BOOKINGS_SUCCESS, GET_SALON_REPORT_FAILURE, GET_SALON_REPORT_REQUEST, GET_SALON_REPORT_SUCCESS, UPDATE_BOOKING_STATUS_FAILURE, UPDATE_BOOKING_STATUS_REQUEST, UPDATE_BOOKING_STATUS_SUCCESS } from "./actionTypes";

const API_BASE_URL = "/api/bookings";

export const createBooking = ({ jwt, salonId, bookingData }) => async (dispatch) => {
    dispatch({ type: CREATE_BOOKINGS_REQUEST });

    try {
        const { data } = await api.post(API_BASE_URL, bookingData,
            {
                headers: { Authorization: `Bearer ${jwt}` },
                params: { salonId, paymentMethod: "RAZORPAY" },
            }
        );
        console.log("create booking", data);
        window.location.href = data.payment_link_url

        dispatch({ type: CREATE_BOOKINGS_SUCCESS, payload: data })
    } catch (error) {
        console.log("error creating booking ", error);
        dispatch({ type: CREATE_BOOKINGS_FAILURE, payload: error.message });
    }
}


export const fetchCustomerBookings = (jwt) => async (dispatch) => {
    dispatch({ type: FECTH_CUSTOMER_BOOKINGS_REQUEST });

    try {
        const { data } = await api.get(`${API_BASE_URL}/customer`, {
            headers: { Authorization: `Bearer ${jwt}` }
        });
        console.log("customer bookings ", data);
        dispatch({ type: FECTH_CUSTOMER_BOOKINGS_SUCCESS, payload: data });
    } catch (error) {
        console.log("error ", error);
        dispatch({ type: FECTH_CUSTOMER_BOOKINGS_FAILURE, payload: error.message });
    }
}


export const fetchSalonBookings = (jwt) => async (dispatch) => {
    dispatch({ type: FETCH_SALON_BOOKINGS_REQUEST });

    try {
        const { data } = await api.get(`${API_BASE_URL}/salon`, {
            headers: { Authorization: `Bearer ${jwt}` }
        });
        console.log("Salon bookings ", data);
        dispatch({ type: FETCH_SALON_BOOKINGS_SUCCESS, payload: data });
    } catch (error) {
        console.log("error fetch salon Bookings ", error);
        dispatch({ type: FETCH_SALON_BOOKINGS_FAILURE, payload: error.message });
    }
}

export const fetchBookingById = (bookingId) => async (dispatch) => {
    dispatch({ type: FETCH_BOOKING_BY_ID_REQUEST });

    try {
        const { data } = await api.get(`${API_BASE_URL}/${bookingId}`);
        dispatch({ type: FETCH_BOOKING_BY_ID_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_SALON_BY_ID_FAILURE, payload: error.message });
    }
}


export const updateBookingStatus = ({ bookingId, status, jwt }) => async (dispatch) => {
    dispatch({ type: UPDATE_BOOKING_STATUS_REQUEST });

    try {
        const { data } = await api.put(`${API_BASE_URL}/${bookingId}/status`, {
            headers: { Authorization: `Bearer ${jwt}`, params: { status } }
        });
        console.log("Update Booking status ", data);
        dispatch({ type: UPDATE_BOOKING_STATUS_SUCCESS, payload: data });
    } catch (error) {
        console.log("error udpate Booking status ", error);
        dispatch({ type: UPDATE_BOOKING_STATUS_FAILURE, payload: error.message });
    }
}


export const getSalonReport = (jwt) => async (dispatch) => {
    dispatch({ type: GET_SALON_REPORT_REQUEST });

    try {
        const response = await api.get(`${API_BASE_URL}/report`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }

        );
        dispatch({ type: GET_SALON_REPORT_SUCCESS, payload: response.data });
        console.log("booking report ", response.data);
    } catch (error) {
        console.log("error", error);
        dispatch({ type: GET_SALON_REPORT_FAILURE, payload: error.response ? error.response.data : error.message });
    }
}