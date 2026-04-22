import api from "src/Config/api";
import {
  FETCH_BOOKINGS_FAILURE,
  FETCH_BOOKINGS_REQUEST,
  FETCH_BOOKINGS_SUCCESS,
  FETCH_EARNINGS_FAILURE,
  FETCH_EARNINGS_REQUEST,
  FETCH_EARNINGS_SUCCESS,
} from "./actionType";

const API_BASE_URL = "/api/bookings/chart";

export const fetchEarnings = (token) => async (dispatch) => {
  dispatch({ type: FETCH_EARNINGS_REQUEST });

  try {
    const response = await api.get(`${API_BASE_URL}/earnings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("earnings  chart response", response.data);
    dispatch({ type: FETCH_EARNINGS_SUCCESS, payload: response.data });
  } catch (error) {
    console.log("Error fetching earnings chart Data", error);
    dispatch({
      type: FETCH_EARNINGS_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};

export const fetchBookings = (token) => async (dispatch) => {
  dispatch({ type: FETCH_BOOKINGS_REQUEST });

  try {
    const response = await api.get(`${API_BASE_URL}/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("earnings  bookings response", response.data);
    dispatch({ type: FETCH_BOOKINGS_SUCCESS, payload: response.data });
  } catch (error) {
    console.log("Error fetching earnings chart Data", error);
    dispatch({
      type: FETCH_BOOKINGS_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};
