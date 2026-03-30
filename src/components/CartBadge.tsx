import { useCart } from '@/context';

const intl = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR'
});

const CartBadge = () => {
  const { items } = useCart();
  const itemCount = items.reduce((total, item) => total + (item.quantity || 1), 0);
  const totalPrice = items.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  return (
    <span aria-label='cart-count' className='badge badge-primary badge-sm indicator-item'>
      Items in your cart: {itemCount} and you'll pay up to {intl.format(totalPrice)}
    </span>
  );
};

export default CartBadge;
