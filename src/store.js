import { applyMiddleware, combineReducers, compose } from "@reduxjs/toolkit";
import { createStore } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import { orderDetailsReducer, orderReducer, orderPayReducer } from "./reducers/orderReducers";
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers";
import {
  userRegisterReducer,
  userSignInReducer,
} from "./reducers/userReducers";

const iniitalState = {
  userSignIn: {
    // we use parse beacause value we saved in local storage is string and need to be converted to array
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "Khalti",
  },
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignIn: userSignInReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderReducer,
  orderDetails: orderDetailsReducer,
  orderPay:orderPayReducer
});

const store = createStore(
  reducer,
  iniitalState,
  compose(applyMiddleware(thunk))
);
export default store;
