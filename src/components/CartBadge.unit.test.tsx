import type { CartItem } from '@/types';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import CartBadge from './CartBadge';

// Mock the @/context module to provide a mocked useCart hook
vi.mock('@/context', () => ({
  useCart: vi.fn()
}));
import { useCart } from '@/context'; // In tests, this will be the mocked version
const mockUseCart = vi.mocked(useCart);

// Helper function to render CartBadge with mocked cart items
const renderCartBadgeWithItems = (items: CartItem[]) => {
  mockUseCart.mockReturnValue({
    items,
    addItem: vi.fn()
  });
  return render(<CartBadge />);
};

describe('CartBadge', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('should render with empty cart', () => {
    renderCartBadgeWithItems([]);
    const badge = screen.getByLabelText('cart-count');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("Items in your cart: 0 and you'll pay up to 0,00 €");
  });
  it('should render with single item', () => {
    const items: CartItem[] = [
      {
        id: 1,
        name: 'Test Product',
        image: 'test.jpg',
        price: 10.99,
        quantity: 1
      }
    ];
    renderCartBadgeWithItems(items);
    const badge = screen.getByLabelText('cart-count');
    expect(badge).toHaveTextContent("Items in your cart: 1 and you'll pay up to 10,99 €");
  });
  it('should render with multiple items with mixed quantities', () => {
    const items: CartItem[] = [
      {
        id: 1,
        name: 'Product 1',
        image: 'test1.jpg',
        price: 10.0,
        quantity: 2
      },
      {
        id: 2,
        name: 'Product 2',
        image: 'test2.jpg',
        price: 25.99,
        quantity: 1
      },
      {
        id: 3,
        name: 'Product 3',
        image: 'test3.jpg',
        price: 5.5,
        quantity: 4
      }
    ];
    renderCartBadgeWithItems(items);
    const badge = screen.getByLabelText('cart-count');
    expect(badge).toHaveTextContent("Items in your cart: 7 and you'll pay up to 67,99 €");
  });
  it('should format currency correctly in German locale', () => {
    const items: CartItem[] = [
      {
        id: 1,
        name: 'Expensive Product',
        image: 'test.jpg',
        price: 1234.56,
        quantity: 1
      }
    ];
    renderCartBadgeWithItems(items);
    const badge = screen.getByLabelText('cart-count');
    expect(badge).toHaveTextContent("Items in your cart: 1 and you'll pay up to 1.234,56 €");
  });
  it('should handle decimal prices correctly', () => {
    const items: CartItem[] = [
      {
        id: 1,
        name: 'Product with cents',
        image: 'test.jpg',
        price: 9.99,
        quantity: 3
      }
    ];
    renderCartBadgeWithItems(items);
    const badge = screen.getByLabelText('cart-count');
    expect(badge).toHaveTextContent("Items in your cart: 3 and you'll pay up to 29,97 €");
  });
  it('should have correct CSS classes', () => {
    renderCartBadgeWithItems([]);
    const badge = screen.getByLabelText('cart-count');
    expect(badge).toHaveClass('badge');
    expect(badge).toHaveClass('badge-primary');
    expect(badge).toHaveClass('badge-sm');
    expect(badge).toHaveClass('indicator-item');
  });
  it('should be accessible with aria-label', () => {
    renderCartBadgeWithItems([]);
    const badge = screen.getByLabelText('cart-count');
    expect(badge).toBeInTheDocument();
    expect(badge.getAttribute('aria-label')).toBe('cart-count');
  });
  it('should handle edge case with zero price items', () => {
    const items: CartItem[] = [
      {
        id: 1,
        name: 'Free Product',
        image: 'test.jpg',
        price: 0,
        quantity: 5
      }
    ];
    renderCartBadgeWithItems(items);
    const badge = screen.getByLabelText('cart-count');
    expect(badge).toHaveTextContent("Items in your cart: 5 and you'll pay up to 0,00 €");
  });
});
