import { api, setAuthToken } from "../../utils";
import { showAlertMessage } from "./alerts";

const REGISTER_SUCCESS = "users/REGISTER_SUCCESES";
const REGISTER_FAIL = "users/REGISTER_FAIL";

const USER_LOADED = "users/USER_LOADED";
const USER_ERROR = "users/USER_ERROR";

const LOGIN_SUCCESS = "users/LOGIN_SUCCESS";
const LOGIN_FAIL = "users/LOGIN_FAIL";
const LOGOUT = "users/LOGOUT";

export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get("/users");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
    });
  }
};

export function register(formData) {
  return async function registerThunk(dispatch) {
    try {
      // Making the API request
      const res = await api.post("/users/register", formData);

      // Dispatch success action if API call is successful
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      // Optionally load user data after successful registration
      dispatch(loadUser());
    } catch (error) {
      // Log the complete error object for debugging
      console.error("Registration error:", error);

      // Safely handle API errors
      const errorMsg = error.response
        ? error.response.data.errors[0].msg
        : "An error occurred";

      // Show an alert with the error message
      dispatch(showAlertMessage(errorMsg, "error"));

      // Dispatch failure action
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
}

export function login(email, password) {
  return async function loginThunk(dispatch) {
    try {
      // Making the API request
      const res = await api.post("/users/login", { email, password });

      // Dispatch success action if API call is successful
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      // Optionally load user data after successful registration
      dispatch(loadUser());
    } catch (error) {
      // Log the complete error object for debugging
      console.error("Login error:", error);

      // Safely handle API errors
      const errorMsg = error.response
        ? error.response.data.errors[0].msg
        : "An error occurred";

      // Show an alert with the error message
      dispatch(showAlertMessage(errorMsg, "error"));

      // Dispatch failure action
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };
}

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      setAuthToken(payload.token);

      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        loading: false,
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
      setAuthToken();

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    case USER_ERROR:
    case LOGOUT:
      setAuthToken();

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
}
