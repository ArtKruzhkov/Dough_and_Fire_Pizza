import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {},
};

const makeKey = ({ id, size, type }) => `${id}_${size}_${type}`;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const key = makeKey(action.payload);
      const item = state.items[key];

      if (item) {
        item.count += 1;
      } else {
        state.items[key] = { ...action.payload, count: 1 };
      }
    },
    decrementItem(state, action) {
      const key = makeKey(action.payload);
      const item = state.items[key];

      if (!item) return;

      if (item.count > 1) {
        item.count -= 1;
      } else {
        delete state.items[key];
      }
    },
    incrementItem(state, action) {
      const key = makeKey(action.payload);
      const item = state.items[key];

      if (!item) return;

      item.count += 1;
    },
    removeItem(state, action) {
      const key = makeKey(action.payload);
      delete state.items[key];
    },
    clearCart(state) {
      state.items = {};
    },
  },
});

export const { addToCart, decrementItem, incrementItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

export const selectTotalCount = (state) =>
  Object.values(state.cart.items).reduce((acc, it) => acc + it.count, 0);

export const selectTotalPrice = (state) =>
  Object.values(state.cart.items).reduce((acc, it) => acc + it.price * it.count, 0);
