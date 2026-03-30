import type { CartItem } from '@/types';
import { CartBadge, ProductCard } from '@/components';
import { CartProvider } from '@/context';

const products: CartItem[] = [
  {
    id: 1,
    name: 'Sample Product',
    image: 'https://placehold.co/150',
    price: 19.99,
  },
  {
    id: 2,
    name: 'Another Product',
    image: 'https://placehold.co/150',
    price: 29.99,
  },
  {
    id: 3,
    name: 'Third Product',
    image: 'https://placehold.co/150',
    price: 39.99,
  },
  {
    id: 4,
    name: 'Fourth Product',
    image: 'https://placehold.co/150',
    price: 49.99,
  },
  {
    id: 5,
    name: 'Fifth Product',
    image: 'https://placehold.co/150',
    price: 59.99,
  },
];

const App = () => {
  return (
    <CartProvider>
      <div className="container mx-auto">
        <CartBadge />
        <div className="flex flex-wrap gap-5 mt-5">
          {products.map((product) => (
            <ProductCard key={product.id} item={product} />
          ))}
        </div>
      </div>
      <div>im a footer</div>
    </CartProvider>
  );
};

export default App;
