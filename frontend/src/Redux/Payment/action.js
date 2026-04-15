import api from "src/Config/api"
import { PROCEED_PAYMENT_FAILURE, PROCEED_PAYMENT_REQUEST, PROCEED_PAYMENT_SUCCESS } from "./actionType"


export const paymentSuccess = ({ paymentId, paymentLinkId, jwt }) => async (dispatch) => {
    dispatch({ type: PROCEED_PAYMENT_REQUEST })

    try {
        const response = await api.patch("/api/payments/proceed", null, {
            headers: { Authorization: `Bearer ${jwt}` },
            params: { paymentId, paymentLinkId }
        });

        dispatch({ type: PROCEED_PAYMENT_SUCCESS, payload: response.data });
        console.log("Payment ", response.data);
    } catch (error) {
        dispatch({ type: PROCEED_PAYMENT_FAILURE, payload: error.response ? error.response.data : error.message })
    }
}