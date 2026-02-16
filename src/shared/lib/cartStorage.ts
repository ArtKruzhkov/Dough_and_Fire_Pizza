import { CartState } from '../../slices/cartSlice';

export const loadCartFromLocalStorage = (): CartState | undefined => {
  try {
    const data = localStorage.getItem('cart');
    if (!data) return undefined;

    return JSON.parse(data) as CartState;
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
    return undefined;
  }
};

export const saveCartToLocalStorage = (cart: CartState): void => {
  try {
    const data = JSON.stringify(cart);
    localStorage.setItem('cart', data);
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
};

export const clearCartStorage = (): void => {
  try {
    localStorage.removeItem('cart');
  } catch (error) {
    console.error('Failed to clear cart from localStorage:', error);
  }
};
