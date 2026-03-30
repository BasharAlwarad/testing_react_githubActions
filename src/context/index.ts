import { createContext, use } from 'react';
import type { CartCtx } from '@/types';

export const CartContext = createContext<CartCtx | undefined>(undefined);

export const useCart = () => {
  const ctx = use(CartContext);
  if (!ctx) throw new Error('useCart must be used within <CartProvider>');
  return ctx;
};

export { default as CartProvider } from './CartProvider';
