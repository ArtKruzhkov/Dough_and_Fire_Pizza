import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: ['All', 'Meat', 'Vegetarian', 'Grilled', 'Spicy'],
  activeCategory: 0,
  sortList: ['popularity', 'price', 'alphabetically'],
  activeSort: 0,
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
    setActiveSort(state, action) {
      state.activeSort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { setActiveCategory, setActiveSort, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;
