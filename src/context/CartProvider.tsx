import { useState, type ReactNode } from 'react';
import type { CartItem } from '@/types';
import { CartContext } from '.';

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    const existingItem = items.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setItems(
        items.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
            : cartItem
        )
      );
    } else {
      setItems([...items, { ...item, quantity: 1 }]);
    }
  };

  return <CartContext value={{ items, addItem }}>{children}</CartContext>;
};

export default CartProvider;
