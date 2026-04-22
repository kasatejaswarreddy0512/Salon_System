import api from "src/Config/api";
import { CREATE_BOOKINGS_SUCCESS } from "../Booking/actionTypes";
import {
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_REQUEST,
  DELETE_CATEGORY_FAILURE,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  GET_ALL_CATEGORIES_FAILURE,
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_CATEGORIES_BY_SALON_FAILURE,
  GET_CATEGORIES_BY_SALON_REQUEST,
  GET_CATEGORIES_BY_SALON_SUCCESS,
  GET_CATEGORY_BY_ID_FAILURE,
  GET_CATEGORY_BY_ID_REQUEST,
  GET_CATEGORY_BY_ID_SUCCESS,
} from "./actionTypes";

const BASE_URL = "/api/category";

export const createCategory =
  ({ category, jwt }) =>
  async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });

    try {
      const config = { headers: { Authorization: `Bearer ${jwt}` } };
      const response = await api.post(
        `${BASE_URL}/salon-owner`,
        category,
        config,
      );
      console.log("created category ", response.data);
      dispatch({ type: CREATE_BOOKINGS_SUCCESS, payload: response.data });
    } catch (error) {
      console.log("error creating category ", error);
      dispatch({
        type: CREATE_CATEGORY_FAILURE,
        payload: error.response?.data || "Error creating category",
      });
    }
  };

export const getAllCategories = () => async (dispatch) => {
  dispatch({ type: GET_ALL_CATEGORIES_REQUEST });
  try {
    const response = await api.get(BASE_URL);
    dispatch({ type: GET_ALL_CATEGORIES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: GET_ALL_CATEGORIES_FAILURE,
      payload: error.response?.data || "Error fetch categories",
    });
  }
};

export const getCategoriesBySalon =
  ({ jwt, salonId }) =>
  async (dispatch) => {
    dispatch({ type: GET_CATEGORIES_BY_SALON_REQUEST });
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      };
      const response = await api.get(`${BASE_URL}/salon/${salonId}`, config);
      dispatch({
        type: GET_CATEGORIES_BY_SALON_SUCCESS,
        payload: response.data,
      });
      console.log(" category by Salon   ", response.data);
    } catch (error) {
      console.log("error get salon categories ", error);
      dispatch({
        type: GET_CATEGORIES_BY_SALON_FAILURE,
        payload: error.response?.data || "Error fetch salon categories",
      });
    }
  };

export const getCategoryById = (id) => async (dispatch) => {
  dispatch({ type: GET_CATEGORY_BY_ID_REQUEST });
  try {
    const response = await api.get(`${BASE_URL}/${id}`);
    dispatch({ type: GET_CATEGORY_BY_ID_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: GET_CATEGORY_BY_ID_FAILURE,
      payload: error.response?.data || "Error fetch categories",
    });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  dispatch({ type: DELETE_CATEGORY_REQUEST });
  try {
    const response = await api.delete(`${BASE_URL}/${id}`);
    dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORY_FAILURE,
      payload: error.response?.data || "Error fetch categories",
    });
  }
};
