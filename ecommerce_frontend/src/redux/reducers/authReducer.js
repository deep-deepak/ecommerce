/***
 * authReducers accepts our previous state of app and action being dispatched, calculate the next state and returns the new object
 */
import {
  LOAD_USER,
  LOADING_USER,
  LOGOUT_USER,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_RESET,
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
import { KEYS } from "../../config/constants";

const intialState = {
  isLoading: false,
  userDetails: null,
};

//
export const Auth = (state = intialState, action) => {
  // Use the initialState as a default value
  const { type, payload } = action;

  switch (type) {
    case LOADING_USER:
      return {
        ...state,
        isLoading: payload,
      };
    case LOAD_USER:
      localStorage.setItem(KEYS.user, JSON.stringify(payload));
      return {
        ...state,
        userDetails: payload,
        isLoading: false,
      };
    case LOGOUT_USER:
      localStorage.removeItem(KEYS.user);
      return {
        ...intialState,
      };
    default:
      return state;
  }
};

export default Auth;

// User Profile reducer

export const userInfoReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };

    case USER_DETAILS_SUCCESS:
      // console.log("userReducer...", action.payload);

      return { loading: false, user: action.payload };

    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    case USER_DETAILS_RESET:
      return { user: {} };

    default:
      return state;
  }
};

// user update profile reducer
export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };

    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };

    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };

    case USER_UPDATE_PROFILE_RESET:
      return {};

    default:
      return state;
  }
};
// user list reducer
export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };

    case USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        page: action.payload.page,
        pages: action.payload.pages,
      };

    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };

    case USER_LIST_RESET:
      return { users: [] };

    default:
      return state;
  }
};

// delete user reducer
export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };

    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };

    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// update user reducer
export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };

    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true };

    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case USER_UPDATE_RESET:
      return { user: {} };

    default:
      return state;
  }
};
