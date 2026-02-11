import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

type FilterState = {
  categories: string[];
  activeCategory: number;
  sortList: string[];
  activeSort: number;
  currentPage: number;
  searchValue: string;
};

const initialState: FilterState = {
  categories: ['All', 'Meat', 'Vegetarian', 'Grilled', 'Spicy'],
  activeCategory: 0,
  sortList: ['popularity', 'price', 'alphabetically'],
  activeSort: 0,
  currentPage: 1,
  searchValue: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveCategory(state, action: PayloadAction<number>) {
      state.activeCategory = action.payload;
    },
    setActiveSort(state, action: PayloadAction<number>) {
      state.activeSort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;

export const { setActiveCategory, setActiveSort, setCurrentPage, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
