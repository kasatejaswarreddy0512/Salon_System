import { PROCEED_PAYMENT_FAILURE, PROCEED_PAYMENT_REQUEST, PROCEED_PAYMENT_SUCCESS } from "./actionType";


const initialState = {
    success: null,
    loading: false,
    error: null,
}

export const paymentReducers = (state = initialState, action) => {

    switch (action.type) {
        case PROCEED_PAYMENT_REQUEST:
            return { ...state, loading: true, success: null, error: null };

        case PROCEED_PAYMENT_SUCCESS:
            return { ...state, loading: false, success: action.payload, error: null };

        case PROCEED_PAYMENT_FAILURE:
            return { ...state, loading: false, success: false, error: action.payload };

        default:
            return state;
    }
}