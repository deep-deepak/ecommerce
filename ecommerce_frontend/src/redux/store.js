/***
 * tore holds the whole state tree of our application.
 */
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { KEYS } from "../config/constants";

import { sellerorderListReducer } from "./reducers/orderReducers";
import authReducer from "./reducers/authReducer";
import { cartReducer } from "./reducers/cartReducers";
import {
  orderReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListMyReducer,
  orderListReducer,
} from "./reducers/orderReducers";

import {
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userInfoReducer,
} from "./reducers/authReducer";

import productListReducerAdmin from "./reducers/productReducers";
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  // productListReducerAdmin,
} from "./reducers/productReducers";

// import productsReducer from "./reducers/productsReducer";

const reducers = combineReducers({
  authReducer,
  cartReducer,
  orderReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListMyReducer,
  orderListReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userInfoReducer,
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productListReducerAdmin,
  sellerorderListReducer,
});

let userDetails = localStorage.getItem(KEYS.user);
if (userDetails) {
  userDetails = JSON.parse(userDetails);
}

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userDetailsFromStorage = localStorage.getItem("userDetails")
  ? JSON.parse(localStorage.getItem("userDetails"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  /**
   * user details
   */
  authReducer: {
    userDetails: userDetails,
    userDetailsFromStorage,
  },

  /**
   * add to cart
   */
  cartReducer: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
};

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
