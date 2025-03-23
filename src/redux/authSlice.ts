import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { unauthAxios } from "../config/axiosConfig";
import endPoint from "../services";
import {
  ILoginRequest,
  IUser,
  IAuthResponse,
} from "../interfaces/auth.interface";
import { showToast, ToastType } from "../shared/toast";
import { getSessionIdFromToken } from "../shared/common";

interface AuthState {
  user: IUser | null;
  token: string | null;
  refreshToken: string | null;
  tokenExpires: number | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("authToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  tokenExpires: Number(localStorage.getItem("tokenExpires")) || null,
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk<
  IAuthResponse,
  ILoginRequest,
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await unauthAxios.post<IAuthResponse>(
      endPoint.AUTH.LOGIN,
      credentials
    );

    localStorage.setItem("authToken", response.data.token);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    localStorage.setItem("tokenExpires", response.data.tokenExpires.toString());

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const sessionId = getSessionIdFromToken();
      await unauthAxios.post<IAuthResponse>(
        `${endPoint.AUTH.LOGOUT}/${sessionId}`
      );

      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("tokenExpires");
    } catch (error: any) {
      console.error("Logout error:", error);
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<IAuthResponse>) => {
          state.isLoading = false;
          state.token = action.payload.token;
          state.refreshToken = action.payload.refreshToken;
          state.tokenExpires = action.payload.tokenExpires;
          state.user = action.payload.user;
          showToast(ToastType.SUCCESS, "Login success");
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Login failed";
        showToast(ToastType.ERROR, state.error);
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.tokenExpires = null;
        showToast(ToastType.SUCCESS, "Logout success");
      });
  },
});

export const getUserProfile = (state: { auth: AuthState }) => state.auth.user;
export const getLoadingLogin = (state: { auth: AuthState }) =>
  state.auth.isLoading;
export const getErrorLogin = (state: { auth: AuthState }) => state.auth.error;
export const getToken = (state: { auth: AuthState }) => state.auth.token;

export const {} = authSlice.actions;

export default authSlice.reducer;
