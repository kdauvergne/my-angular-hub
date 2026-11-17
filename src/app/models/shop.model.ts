export type ProductCategory = 'hardware' | 'formation' | 'goodies';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: ProductCategory;
  stock: number;
  icon: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
