import {
  FETCH_BOOKINGS_FAILURE,
  FETCH_BOOKINGS_REQUEST,
  FETCH_BOOKINGS_SUCCESS,
  FETCH_EARNINGS_FAILURE,
  FETCH_EARNINGS_REQUEST,
  FETCH_EARNINGS_SUCCESS,
} from "./actionType";

const initialState = {
  earnings: {
    loading: false,
    error: null,
    data: [],
  },
  bookings: {
    loading: false,
    error: null,
    data: [],
  },
};

export const chartReducer = (state = initialState, action) => {
  switch (action.type) {
    // 🔹 Earnings
    case FETCH_EARNINGS_REQUEST:
      return {
        ...state,
        earnings: {
          ...state.earnings,
          loading: true,
          error: null,
        },
      };

    case FETCH_EARNINGS_SUCCESS:
      return {
        ...state,
        earnings: {
          ...state.earnings,
          loading: false,
          data: action.payload,
        },
      };

    case FETCH_EARNINGS_FAILURE:
      return {
        ...state,
        earnings: {
          ...state.earnings,
          loading: false,
          error: action.payload,
        },
      };

    // 🔹 Bookings
    case FETCH_BOOKINGS_REQUEST:
      return {
        ...state,
        bookings: {
          ...state.bookings,
          loading: true,
          error: null,
        },
      };

    case FETCH_BOOKINGS_SUCCESS:
      return {
        ...state,
        bookings: {
          ...state.bookings,
          loading: false,
          data: action.payload,
        },
      };

    case FETCH_BOOKINGS_FAILURE:
      return {
        ...state,
        bookings: {
          ...state.bookings,
          loading: false,
          error: action.payload,
        },
      };

    default:
      return state;
  }
};
