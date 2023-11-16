import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

export const fetchPizza = createAsyncThunk(
  'pizza/fetchPizza',
  async (params) => {
    const { selectedCategoryId, search, currentPage, sortBy, sortProperty, searchValue } = params
    console.log(searchValue);
    const { data } = await axios.get(
      `https://654b48cc5b38a59f28eecced.mockapi.io/items?page=${currentPage}&limit=8&${selectedCategoryId > 0 ? `category=${selectedCategoryId}` : ""
      }&sortBy=${sortProperty}&order=${sortBy}${search}`
    );

    return data
  }
)

const initialState = {
  items: [],
  status: "loading"
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    }
  },
  extraReducers: {
    [fetchPizza.pending]: (state) => {
      state.status = "loading"
      state.status = []
    },
    [fetchPizza.fulfilled]: (state, action) => {
      state.items = action.payload
      state.status = "success"
    },
    [fetchPizza.rejected]: (state) => {
      state.status = "rejected"
      state.items = []
    },
  }
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer