import { api } from "../../utils";
import { showAlertMessage } from "./alerts";

const GET_PROFILE = "profiles/GET_PROFILE";
const ERROR_GET_PROFILE = "profiles/ERROR_GET_PROFILE";
const GET_PROFILES = "profiles/GET_PROFILES";
const ERROR_GET_PROFILES = "profiles/ERROR_GET_PROFILES";

const UPDATE_PROFILE = "profiles/UPDATE_PROFILE";
const ERROR_UPDATE_PROFILE = "profiles/ERROR_UPDATE_PROFILE";

const CLEAR_PROFILE = "profiles/CLEAR_PROFILES";
const ERROR_CLEAR_PROFILE = "profiles/ERROR_CLEAR_PROFILE";

const CREATE_PROFILE = "profiles/CREATE_PROFILE";
const ERROR_CREATE_PROFILE = "profiles/ERROR_CREATE_PROFILE";

const UPLOAD_PROFILE_IMAGE = "profiles/UPLOAD_PROFILE_IMAGE";
const ERROR_UPLOAD_PROFILE_IMAGE = "profiles/ERROR_UPLOAD_PROFILE_IMAGE";

export const getProfileDetails = () => async (dispatch) => {
  try {
    const res = await api.get("profiles/me");
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (error) {
    if (error.response) {
      dispatch({ type: ERROR_GET_PROFILE, payload: error.response.data.msg });
      console.error(error);
    }
  }
};

export function createProfile(formData, navigate) {
  return async function createProfileThunk(dispatch) {
    try {
      const res = await api.post("/profiles", formData);

      dispatch({
        type: CREATE_PROFILE,
        payload: res.data,
      });

      navigate("/home");
      dispatch(showAlertMessage("Created Account", "success"));
    } catch (error) {
      console.error(error);

      error.response.data.errors.forEach((err) =>
        dispatch(showAlertMessage(err.msg, "error"))
      );
    }
  };
}

export const deleteAccount = () => async (dispatch) => {
  if (
    window.confirm("Are You Sure Do You Want To Delete This Account Paremently")
  ) {
    try {
      await api.delete("/profiles");

      dispatch({ type: CLEAR_PROFILE });

      dispatch(
        showAlertMessage("Your Account Has Been Permanently Deleted", "success")
      );
    } catch (error) {
      dispatch({
        type: ERROR_CLEAR_PROFILE,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  }
};

export function addEducation(formData, navigate) {
  return async function addEducationThunk(dispatch) {
    try {
      const res = await api.put("/profiles/education", formData);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });

      dispatch(showAlertMessage("Education Added", "success"));

      navigate("/home");
    } catch (error) {
      if (error.response)
        error.response.data.errors.forEach((err) =>
          dispatch(showAlertMessage(err.msg, "error"))
        );
    }
  };
}
export const deleteEducation = (edu_id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profiles/education/${edu_id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(showAlertMessage("Education Deleted"));
  } catch (error) {
    if (error.response)
      error.response.data.errors.forEach((err) =>
        dispatch(showAlertMessage(err.msg, "error"))
      );
  }
};

export function addExperience(formData, navigate) {
  return async function addExperienceThunk(dispatch) {
    try {
      const res = await api.put("/profiles/experience", formData);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });

      dispatch(showAlertMessage("Experience Added", "success"));

      navigate("/home");
    } catch (error) {
      if (error.response)
        error.response.data.errors.forEach((err) =>
          dispatch(showAlertMessage(err.msg, "error"))
        );
    }
  };
}

export const deleteExperience = (exp_id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profiles/experience/${exp_id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(showAlertMessage("Experience Deleted"));
  } catch (error) {
    if (error.response)
      error.response.data.errors.forEach((err) =>
        dispatch(showAlertMessage(err.msg, "error"))
      );
  }
};

export function updateProfile(formData) {
  return async function updateProfileThunk(dispatch) {
    try {
      const res = await api.post("/profiles", formData);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });

      // dispatch(showAlertMessage("Profile Updated"));
    } catch (error) {
      console.error(error);

      dispatch(showAlertMessage("error", "error"));
    }
  };
}

export const uploadProfileImage = (data) => async (dispatch) => {
  try {
    const res = await api.post(
      `http://localhost:4000/api/profiles/upload`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch({
      type: UPLOAD_PROFILE_IMAGE,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const getUsersProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await api.get("/profiles");

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_GET_PROFILES,
    });

    if (error.response)
      error.response.data.errors.forEach((err) =>
        dispatch(showAlertMessage(err.msg, "error"))
      );
  }
};
export const getProfileById = (user_id) => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await api.get(`/profiles/user/${user_id}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_GET_PROFILE,
    });

    if (error.response)
      error.response.data.errors.forEach((err) =>
        dispatch(showAlertMessage(err.msg, "error"))
      );
  }
};

const initialState = {
  loading: true,
  profile: null,
  profiles: [],
  error: null,
  image: null,
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_PROFILE:
    case UPDATE_PROFILE:
    case GET_PROFILE:
      return {
        ...state,
        loading: false,
        error: null,
        profile: payload,
      };

    case GET_PROFILES:
      return {
        ...state,
        loading: false,
        error: null,
        profiles: payload,
      };

    case CLEAR_PROFILE:
      return {
        ...state,
        loading: false,
        profile: null,
        profiles: [],
        image: null,
        error: null,
      };

    case ERROR_GET_PROFILE:
    case ERROR_GET_PROFILES:
    case ERROR_UPLOAD_PROFILE_IMAGE:
    case ERROR_CREATE_PROFILE:
    case ERROR_UPDATE_PROFILE:
      return {
        ...state,
        loading: false,
        error: payload,
        profiles: [],
        profile: null,
      };

    case UPLOAD_PROFILE_IMAGE:
      return {
        ...state,
        loading: false,
        image: payload, // Update image
        error: null, // Clear errors on success
      };

    default:
      return state; // Preserve current state if action type is not handled
  }
}
