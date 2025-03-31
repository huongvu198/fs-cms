import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISegment } from "../interfaces/segment.interface";
import { authAxios } from "../config/axiosConfig";
import endPoint from "../services";
import { showToast, ToastType } from "../shared/toast";

interface SegmentState {
  segment: ISegment[];
}

const initialState: SegmentState = {
  segment: [],
};

export const getSegments = createAsyncThunk(
  "segment/get-segments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAxios.get<ISegment[]>(endPoint.SEGMENT.LIST);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const segmentSlice = createSlice({
  name: "segment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getSegments.fulfilled,
        (state, action: PayloadAction<ISegment[]>) => {
          state.segment = action.payload;
        }
      )
      .addCase(getSegments.rejected, () => {
        showToast(ToastType.ERROR, "Fetch segment faild");
      });
  },
});

export const getListSegment = (state: { segment: SegmentState }) =>
  state.segment.segment;

export const {} = segmentSlice.actions;

export default segmentSlice.reducer;
