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
    },
    setFilters(state, action) {
      state.currentPage = +action.payload.currentPage
      state.selectedCategoryId = +action.payload.selectedCategoryId
      state.selectedPopupSort = action.payload.selectedPopupSort
    }
  }
})

export const { setCategoryId, setSort, setCurrentPage, setFilters } = filterSlice.actions

export default filterSlice.reducer