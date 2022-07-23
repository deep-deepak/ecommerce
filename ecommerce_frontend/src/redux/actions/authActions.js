import axios from "axios";
import { constants } from "../../config";
import {
  LOADING_USER,
  LOAD_USER,
  LOGOUT_USER,
  USER_LOGIN_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../types";
export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_USER,
      payload: true,
    });
    const response = await axios.post(constants.API_URL + "/login", {
      username,
      password,
    });
    console.log("..response", response.data);
    dispatch({
      type: LOAD_USER,
      payload: response.data,
    });
    return true;
  } catch (error) {
    dispatch({ type: LOADING_USER, payload: false });
    console.error("...error", error?.response?.data || error);
    if (error?.response?.data?.detail) {
      alert(error?.response?.data?.detail);
    }
    alert("Something went wrong");
  }
};
//register the user
export const register =
  (first_name, email, username, password) => async (dispatch) => {
    try {
      dispatch({
        type: LOADING_USER,
        payload: true,
      });
      const params = {
        name: first_name,
        email,
        username,
        password,
      };
      // console.log("..params", params);
      const response = await axios.post(
        constants.API_URL + "/register",
        params
      );
      console.log("..response", response.data);
      // dispatch({
      //   type: LOAD_USER,
      //   payload: response.data,
      // });
      dispatch({
        type: LOADING_USER,
        payload: false,
      });
      return true;
    } catch (error) {
      dispatch({ type: LOADING_USER, payload: false });
      // console.error("...error", error?.response?.data || error);
      if (error?.response?.data?.detail) {
        alert(error?.response?.data?.detail);
      }
      alert("Something went wrong");
    }
  };
// logout the user function
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_USER,
  });
};

// admin can getUser Profile

export const getUserInfo = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      authReducer: { userDetails },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const { data } = await axios.get(`/${id}/getuser`, config);
    // console.log({ data });

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
// admin can update the userprofile
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    const {
      authReducer: { userDetails },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const { data } = await axios.put(`/profile/update/`, user, config);

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userDetails", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
// admin can view the list of user
export const listUsers =
  ({ sortBy, sortOrder, page }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_LIST_REQUEST,
      });

      const {
        authReducer: { userDetails },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userDetails.token}`,
        },
        params: {
          sortBy,
          sortOrder,
          page,
        },
      };

      const { data } = await axios.get(`/userlist`, config);

      dispatch({
        type: USER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
// admin can delete the user
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    const {
      authReducer: { userDetails },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const { data } = await axios.delete(`/delete/${id}/`, config);

    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
// admin can update the user
export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    const {
      authReducer: { userDetails },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const { data } = await axios.put(`/update/${user._id}/`, user, config);

    dispatch({
      type: USER_UPDATE_SUCCESS,
    });

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
