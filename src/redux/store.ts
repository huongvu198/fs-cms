import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import segmentReducer from "./segmentSlice";
import productReducer from "./productSlice";
import appReducer from "./appSlice";
import useReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    segment: segmentReducer,
    product: productReducer,
    app: appReducer,
    user: useReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
