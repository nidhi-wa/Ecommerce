import { configureStore } from "@reduxjs/toolkit";
import {cartReducer} from "./reducers/cartReducers";
import {userRegisterLoginReducer} from "./reducers/userReducers";
import {getCategoriesReducer} from "./reducers/categoryReducers";
import {adminChatReducer} from "./reducers/adminChatReducers";

// Load data from localStorage
const cartItemsInLocalStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const userInfoInLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : sessionStorage.getItem("userInfo")
  ? JSON.parse(sessionStorage.getItem("userInfo"))
  : {};

// Initial state
const INITIAL_STATE = {
  cart: {
    cartItems: cartItemsInLocalStorage,
    itemsCount: cartItemsInLocalStorage
      ? cartItemsInLocalStorage.reduce(
          (quantity, item) => Number(item.quantity) + quantity,
          0
        )
      : 0,
    cartSubtotal: cartItemsInLocalStorage
      ? cartItemsInLocalStorage.reduce(
          (price, item) => price + item.price * item.quantity,
          0
        )
      : 0,
  },
  userRegisterLogin: { userInfo: userInfoInLocalStorage },
};

// Configure store with reducers
const store = configureStore({
  reducer: {
    cart: cartReducer,
    userRegisterLogin: userRegisterLoginReducer,
    getCategories: getCategoriesReducer,
    adminChat: adminChatReducer,
  },
  preloadedState: INITIAL_STATE, // Set initial state
});

export default store;
