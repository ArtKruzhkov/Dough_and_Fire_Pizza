import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';

type CartItemType = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  type: number;
  typeLabel: string;
  size: number;
  count: number;
};

type CartItemsMap = Record<string, CartItemType>;

export type CartState = {
  items: CartItemsMap;
};

type MakeKeyParams = {
  id: number;
  size: number;
  type: number;
};

const initialState: CartState = {
  items: {},
};

const makeKey = ({ id, size, type }: MakeKeyParams) => `${id}_${size}_${type}`;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Omit<CartItemType, 'count'>>) {
      const key = makeKey(action.payload);
      const item = state.items[key];

      if (item) {
        item.count += 1;
      } else {
        state.items[key] = { ...action.payload, count: 1 };
      }
    },
    decrementItem(state, action: PayloadAction<MakeKeyParams>) {
      const key = makeKey(action.payload);
      const item = state.items[key];

      if (!item) return;

      if (item.count > 1) {
        item.count -= 1;
      } else {
        delete state.items[key];
      }
    },
    incrementItem(state, action: PayloadAction<MakeKeyParams>) {
      const key = makeKey(action.payload);
      const item = state.items[key];

      if (!item) return;

      item.count += 1;
    },
    removeItem(state, action: PayloadAction<MakeKeyParams>) {
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

export const selectTotalCount = (state: RootState) =>
  Object.values(state.cart.items).reduce((acc, it) => acc + it.count, 0);

export const selectTotalPrice = (state: RootState) =>
  Object.values(state.cart.items).reduce((acc, it) => acc + it.price * it.count, 0);
