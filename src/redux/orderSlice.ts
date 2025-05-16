import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Pagination } from "../interfaces/app.interface";
import { authAxios } from "../config/axiosConfig";
import endPoint from "../services";
import { parsePaginationHeaders } from "../shared/common";
import { showToast, ToastType } from "../shared/toast";
import { Order } from "../interfaces/order.interface";

interface OrderState {
  isLoading: boolean;
  isLoadingAction: boolean;
  error: string | null;
  orders: Order[];
  pagination: Pagination;
}

const initialState: OrderState = {
  isLoading: false,
  isLoadingAction: false,
  error: null,
  orders: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    perPage: 10,
    totalItems: 0,
  },
};

export const getListOrder = createAsyncThunk(
  "orders/list",
  async (
    params: {
      search?: string;
      page?: number;
      perPage?: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await authAxios.get(endPoint.ORDERS.LIST, {
        params,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// export const update = createAsyncThunk(
//   "bank/update",
//   async (args: { id: string; payload: CreateBank }, { rejectWithValue }) => {
//     try {
//       const { id, payload } = args;

//       const response = await authAxios.patch(
//         `${endPoint.BANK.UPDATE}/${id}`,
//         payload
//       );
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message);
//     }
//   }
// );

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getListOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getListOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.items;
        state.pagination = parsePaginationHeaders(action.payload.headers);
      })
      .addCase(getListOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const getLoading = (state: { order: OrderState }) =>
  state.order.isLoading;
export const getLoadingAction = (state: { order: OrderState }) =>
  state.order.isLoadingAction;
export const getError = (state: { order: OrderState }) => state.order.error;
export const getOrders = (state: { order: OrderState }) => state.order.orders;
export const getPagination = (state: { order: OrderState }) =>
  state.order.pagination;

export const {} = orderSlice.actions;

export default orderSlice.reducer;
