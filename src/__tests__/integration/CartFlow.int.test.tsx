import type { CartItem } from '@/types';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider } from '@/context';
import { CartBadge, ProductCard } from '@/components';

describe('Cart flow (integration)', () => {
  it('updates badge after adding an item', async () => {
    const item: CartItem = {
      id: 1,
      name: 'Test Product',
      image: 'test.jpg',
      price: 10.99,
    };
    render(
      <CartProvider>
        <CartBadge />
        <ProductCard item={item} />
      </CartProvider>
    );
    const badge = screen.getByLabelText('cart-count');
    expect(badge).toHaveTextContent('0');
    await fireEvent.click(
      screen.getByRole('button', { name: /add Test Product/i })
    );
    expect(badge).toHaveTextContent('1');
  });
});
