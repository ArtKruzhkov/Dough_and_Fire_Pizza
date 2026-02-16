import { configureStore } from '@reduxjs/toolkit';
import filterSlice from '../slices/filterSlice';
import cartSlice from '../slices/cartSlice';
import pizzasSlice from '../slices/pizzasSlice';

import {
  loadCartFromLocalStorage,
  saveCartToLocalStorage,
  clearCartStorage,
} from '../shared/lib/cartStorage';

const preloadedCart = loadCartFromLocalStorage();

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    cart: cartSlice,
    pizzas: pizzasSlice,
  },
  preloadedState: {
    cart: preloadedCart || { items: {} },
  },
});

store.subscribe(() => {
  const cart = store.getState().cart;

  if (Object.keys(cart.items).length === 0) {
    clearCartStorage();
  } else {
    saveCartToLocalStorage(cart);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
