import axios from "axios";
import api, { API_BASE_URL } from "src/Config/api";
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./actionTypes"


//regsiter User
export const registerUser = (userData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    console.log("auth action", userData);

    try {
        const response = await api.post(`${API_BASE_URL}/auth/signup`, userData.userData);
        const user = response.data;
        if (user?.jwt) {
            localStorage.setItem("jwt", user.jwt);
            userData.navigate("/");
        }
        console.log("register", user);
        dispatch({ type: REGISTER_SUCCESS, payload: user })
    } catch (error) {
        console.log("error ", error);
        dispatch({ type: REGISTER_FAILURE, payload: error })
    }
};

// login User
export const loginUser = (userData) => async (dispacth) => {
    dispacth({ type: LOGIN_REQUEST });
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, userData.data);

        const user = response.data;
        if (user?.jwt) {
            localStorage.setItem("jwt", user.jwt);
            if (user?.role === "ROLE_ADMIN") {
                userData.navigate("/admin");
            } else if (user?.role === "ROLE_SALON_OWNER") {
                userData.navigate("salon-dashboard");
            } else {
                userData.navigate("/")
            }
        }

        console.log("login", user);
        dispacth({ type: LOGIN_SUCCESS, payload: user });
    } catch (error) {
        console.log("error ", error);
        dispacth({ type: LOGIN_FAILURE, payload: error });
    }
}


//get User
export const getUser = (token) => {
    return async (dispatch) => {
        dispatch({ type: GET_USER_REQUEST });
        try {
            const response = await api.get(`/api/users/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            const user = response.data;
            dispatch({ type: GET_USER_SUCCESS, payload: user });
            console.log("req User ", user);
        } catch (error) {
            const errorMessage = error.message;
            dispatch({ type: GET_USER_FAILURE, payload: errorMessage });

        }
    };
};

export const logout = () => {
    return async (dispacth) => {
        dispacth({ type: LOGOUT });
        localStorage.clear();
    }
}
