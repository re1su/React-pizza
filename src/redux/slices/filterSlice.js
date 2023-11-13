import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  selectedCategoryId: 0,
  currentPage: 1,
  selectedPopupSort:  {
		name: "популярности",
		sort: "rating"
	}
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.selectedCategoryId = action.payload
    },
    setSort(state, action) {
      state.selectedPopupSort = action.payload
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    }
  }
})

export const { setCategoryId, setSort, setCurrentPage } = filterSlice.actions

export default filterSlice.reducer