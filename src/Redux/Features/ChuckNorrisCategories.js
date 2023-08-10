import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// thunk for fetching data from the API
export const getAllCategories = createAsyncThunk(
  "/api/jokes/categories",
  async (orders, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.chucknorris.io/jokes/categories`,
        orders
      );
      console.log("fetched categories ", response.data);
      return {
        data: response.data,
      };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    status: null,
    error: null,
  },
  extraReducers: {
    [getAllCategories.pending]: (state) => {
      state.status = "loading.....";
    },
    [getAllCategories.fulfilled]: (state, action) => {
      state.orders = action.payload;
      state.status = "success";
    },
    [getAllCategories.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    },
  },
});

export default orderSlice.reducer;
