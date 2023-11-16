import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  searchValue: '',
  selectedCategoryId: 0,
  currentPage: 1,
  selectedPopupSort: {
    name: "популярности",
    sort: "rating"
  },
  sortBy: "desc"
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.selectedCategoryId = action.payload
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload
    },
    setSort(state, action) {
      state.selectedPopupSort = action.payload
    },
    setSortBy(state, action) {
      state.sortBy = action.payload
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setFilters(state, action) {
      state.currentPage = +action.payload.currentPage
      state.selectedCategoryId = +action.payload.categoryId
      state.selectedPopupSort = action.payload.sort
      state.sortBy = action.payload.sortBy
    }
  }
})

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSortBy, setSearchValue } = filterSlice.actions

export default filterSlice.reducer