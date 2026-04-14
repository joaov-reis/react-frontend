import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import { useDispatch } from "react-redux";

import cartReducer from "./slices/cart-slice";
import reviewReducer from "./slices/review-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    reviews: reviewReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
