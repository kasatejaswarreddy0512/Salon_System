import api from "src/Config/api";
import {
  CREATE_SALON_FAILURE,
  CREATE_SALON_REQUEST,
  CREATE_SALON_SUCCESS,
  FETCH_SALON_BY_ID_FAILURE,
  FETCH_SALON_BY_ID_REQUEST,
  FETCH_SALON_BY_ID_SUCCESS,
  FETCH_SALON_BY_OWNER_FAILURE,
  FETCH_SALON_BY_OWNER_REQUEST,
  FETCH_SALON_BY_OWNER_SUCCESS,
  FETCH_SALON_FAILURE,
  FETCH_SALON_REQUEST,
  FETCH_SALON_SUCCESS,
  SEARCH_SALON_FAILURE,
  SEARCH_SALON_REQUEST,
  SEARCH_SALON_SUCCESS,
  UPDATE_SALON_FAILURE,
  UPDATE_SALON_REQUEST,
  UPDATE_SALON_SUCCESS,
} from "./actionTypes";

const API_BASE_URL = "/api/salon";

// create Salon
export const createSalon = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_SALON_REQUEST });

  try {
    const userResponse = await api.post("/auth/signup", reqData.ownerDetails);

    console.log("signup response =>", userResponse.data);

    const jwt = userResponse.data.jwtToken;

    console.log("jwt =>", jwt);

    if (!jwt) {
      throw new Error("JWT not received from signup response");
    }

    localStorage.setItem("jwt", jwt);

    const response = await api.post(API_BASE_URL, reqData.salonDetails, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({ type: CREATE_SALON_SUCCESS, payload: response.data });
    reqData.navigate("/salon-dashboard");
  } catch (error) {
    console.log("Create salon full error =>", error);
    console.log("Create salon response =>", error?.response);
    console.log("Create salon response data =>", error?.response?.data);

    dispatch({
      type: CREATE_SALON_FAILURE,
      payload: error?.response?.data?.message || error.message,
    });
  }
};

//Update Salon
export const updateSalon =
  ({ slaonId, salon, jwt }) =>
  async (dispatch) => {
    dispatch({ type: UPDATE_SALON_REQUEST });

    try {
      const response = await api.put(`${API_BASE_URL}/${slaonId}`, salon, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      dispatch({ type: UPDATE_SALON_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: UPDATE_SALON_FAILURE, payload: error.message });
    }
  };

//Feteh Salons
export const fetchSalons = () => async (dispatch) => {
  dispatch({ type: FETCH_SALON_REQUEST });

  try {
    const response = await api.get(API_BASE_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    dispatch({ type: FETCH_SALON_SUCCESS, payload: response.data });
    console.log("salon fetch ", response.data);
  } catch (error) {
    dispatch({ type: FETCH_SALON_FAILURE, payload: error.message });
  }
};

//Fetch Salon by Id
export const fetchSalonById =
  ({ salonId }) =>
  async (dispatch) => {
    dispatch({ type: FETCH_SALON_BY_ID_REQUEST });

    try {
      const response = await api.get(`${API_BASE_URL}/getById/${salonId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      dispatch({ type: FETCH_SALON_BY_ID_SUCCESS, payload: response.data });

      console.log("salon By id ", response.data);
    } catch (error) {
      dispatch({ type: FETCH_SALON_BY_ID_FAILURE, payload: error.message });
    }
  };

//Fecch Salon by owner
export const fectchSalonByOwner = (jwt) => async (dispatch) => {
  dispatch({ type: FETCH_SALON_BY_OWNER_REQUEST });

  try {
    const response = await api.get(`${API_BASE_URL}/owner`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({ type: FETCH_SALON_BY_OWNER_SUCCESS, payload: response.data });
    console.log("Salon By Onwer ", response.data);
  } catch (error) {
    dispatch({ type: FETCH_SALON_BY_OWNER_FAILURE, payload: error.message });
  }
};

//Search Salon
export const searchSalons =
  ({ jwt, city }) =>
  async (dispatch) => {
    dispatch({ type: SEARCH_SALON_REQUEST });

    try {
      const response = await api.get(`${API_BASE_URL}/search/${city}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      dispatch({ type: SEARCH_SALON_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: SEARCH_SALON_FAILURE, payload: error.message });
    }
  };
