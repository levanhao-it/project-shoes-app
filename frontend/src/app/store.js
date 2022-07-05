import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/Auth/userSlice";
import cartReducer from "../features/Cart/cartSlice";
import wishListReducer from "../features/Wishlist/wishListSlice";

const rootReducer = {
  user: userReducer,
  cart: cartReducer,
  wishList: wishListReducer,
};

const store = configureStore({
  reducer: rootReducer,
});
export default store;
