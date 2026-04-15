import { CREATE_SERVICE_FAILURE, CREATE_SERVICE_REQUEST, CREATE_SERVICE_SUCCESS, FETCH_SERVICE_BY_ID_REQUEST, FETCH_SERVICE_BY_SALON_FAILURE, FETCH_SERVICE_BY_SALON_REQUEST, FETCH_SERVICE_BY_SALON_SUCCESS, UPDATE_SERVICE_FAILURE, UPDATE_SERVICE_REQUEST, UPDATE_SERVICE_SUCCESS } from "./actionType";


const BASE_URL = "/api/service-offering";

export const createService = ({ service, jwt }) => async (dispatch) => {
    dispatch({ type: CREATE_SERVICE_REQUEST });
    try {
        const { data } = await api.post(`${BASE_URL}/salon-owner`,
            service,
            {
                headers: { Authorization: `Bearer ${jwt}` }
            });
        console.log("service created  ", data);
        dispatch({ type: CREATE_SERVICE_SUCCESS, payload: data });
    } catch (error) {
        console.log("Error create service ", error);
        dispatch({ type: CREATE_SERVICE_FAILURE, payload: error.message });
    }
}



export const updateService = ({ service, serviceId }) => async (dispatch) => {
    dispatch({ type: UPDATE_SERVICE_REQUEST });
    try {
        const { data } = await api.put(`${BASE_URL}/salon-owner/${serviceId}`,
            service);
        console.log("service udpated  ", data);
        dispatch({ type: UPDATE_SERVICE_SUCCESS, payload: data });
    } catch (error) {
        console.log("Error udpate service ", error);
        dispatch({ type: UPDATE_SERVICE_FAILURE, payload: error.message });
    }
}


export const fetchServiceBySalonId = ({ salonId, CategoryId, jwt }) => async (dispatch) => {
    dispatch({ type: FETCH_SERVICE_BY_SALON_REQUEST });
    try {
        const { data } = await api.get(`${BASE_URL}/salon/${salonId}`,
            {
                headers: { Authorization: `Bearer ${jwt}` },
                params: { CategoryId }

            });
        console.log(" all services   ", data);
        dispatch({ type: FETCH_SERVICE_BY_SALON_SUCCESS, payload: data });
    } catch (error) {
        console.log("Error fetch all services ", error);
        dispatch({ type: FETCH_SERVICE_BY_SALON_FAILURE, payload: error.message });
    }
}



export const fetchServiceById = ({ serviceId }) => async (dispatch) => {
    dispatch({ type: FETCH_SERVICE_BY_ID_REQUEST });
    try {
        const { data } = await api.get(`${BASE_URL}/${serviceId}`);
        dispatch({ type: UPDATE_SERVICE_SUCCESS, payload: data });
    } catch (error) {

        dispatch({ type: UPDATE_SERVICE_FAILURE, payload: error.message });
    }
}