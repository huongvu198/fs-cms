import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import segmentReducer from "./segmentSlice";
import productReducer from "./productSlice";
import appReducer from "./appSlice";
import userReducer from "./userSlice";
import voucherReducer from "./voucherSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    segment: segmentReducer,
    product: productReducer,
    app: appReducer,
    user: userReducer,
    voucher: voucherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
