export type CartItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity?: number;
};

export type CartCtx = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
};
