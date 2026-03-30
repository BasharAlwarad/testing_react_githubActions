import type { CartItem } from '@/types';
import { useCart } from '@/context';

const intl = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR'
});

const ProductCard = ({ item }: { item: CartItem }) => {
  const { id, name, image, price } = item;
  const { addItem } = useCart();

  return (
    <article className='card w-56 bg-base-100 shadow-xl'>
      <figure>
        <img src={image} alt={name} className='object-cover h-48 w-full' />
      </figure>
      <div className='card-body'>
        <h3 className='card-title'>{name}</h3>
        <p className='text-lg font-semibold'>{intl.format(price)}</p>
        <div className='card-actions justify-end'>
          <button
            className='btn btn-primary'
            aria-label={`add ${name}`}
            onClick={() => addItem({ id, name, image, price })}
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
