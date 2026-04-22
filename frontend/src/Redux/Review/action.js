import api from "src/Config/api";
import { CREATE_REVIEW_FAILURE, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, DELETE_REVIEW_FAILURE, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, FETCH_REVIEWS_FAILURE, FETCH_REVIEWS_REQUEST, FETCH_REVIEWS_SUCCESS, UPDATE_REVIEW_FAILURE, UPDATE_REVIEW_REQUEST, UPDATE_REVIEW_SUCCESS } from "./actionType"


const BASE_URL = "/api/reviews"

export const fetchReviews = ({ salonId, jwt }) => async (dispatch) => {
    dispatch({ type: FETCH_REVIEWS_REQUEST });
    try {
        const resposnse = await api.get(`${BASE_URL}/salon/${salonId}`, {
            headers: { Authorization: `Bearer ${jwt}` }
        });
        console.log("fecth review ", resposnse.data);
        dispatch({ type: FETCH_REVIEWS_SUCCESS, payload: resposnse.data });
    } catch (error) {
        console.log("Error fetch review ", error);
        dispatch({ type: FETCH_REVIEWS_FAILURE, payload: error.message });
    }
}


export const createReview = ({ salonId, reviewData, jwt }) => async (dispatch) => {
    dispatch({ type: CREATE_REVIEW_REQUEST });
    try {
        const resposnse = await api.post(`${BASE_URL}/salon/${salonId}`,
            reviewData,
            {
                headers: { Authorization: `Bearer ${jwt}` }
            });
        console.log("create review ", resposnse.data);
        dispatch({ type: CREATE_REVIEW_SUCCESS, payload: resposnse.data });
    } catch (error) {
        console.log("Error create review ", error);
        dispatch({ type: CREATE_REVIEW_FAILURE, payload: error.message });
    }
}


export const udpateReview = ({ reviewId, reviewData, jwt }) => async (dispatch) => {
    dispatch({ type: UPDATE_REVIEW_REQUEST });
    try {
        const resposnse = await api.put(`${BASE_URL}/${reviewId}`,
            reviewData,
            {
                headers: { Authorization: `Bearer ${jwt}` }
            });
        console.log("update review ", resposnse.data);
        dispatch({ type: UPDATE_REVIEW_SUCCESS, payload: resposnse.data });
    } catch (error) {
        console.log("Error update review ", error);
        dispatch({ type: UPDATE_REVIEW_FAILURE, payload: error.message });
    }
}


export const deleteReview = ({ reviewId, jwt }) => async (dispatch) => {
    dispatch({ type: DELETE_REVIEW_REQUEST });
    try {
        const resposnse = await api.delete(`${BASE_URL}/${reviewId}`,
            {
                headers: { Authorization: `Bearer ${jwt}` }
            });
        console.log("delete review ", resposnse.data);
        dispatch({ type: DELETE_REVIEW_SUCCESS, payload: resposnse.data });
    } catch (error) {
        console.log("Error update review ", error);
        dispatch({ type: DELETE_REVIEW_FAILURE, payload: error.message });
    }
}