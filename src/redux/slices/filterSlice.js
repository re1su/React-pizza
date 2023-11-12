import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  selectedCategoryId: 0,
  selectedPopupSort:  {
		name: "популярности",
		sort: "rating",
	}
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.selectedCategoryId = action.payload
    }
  }
})

export const { setCategoryId } = filterSlice.actions

export default filterSlice.reducer