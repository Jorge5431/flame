
export interface Product {
  id: string;
  name: string;
  category: 'Men' | 'Women' | 'Accessories';
  price: number;
  image: string;
  description: string;
  colors: string[];
  sizes: string[];
}

export interface CartItem {
  id: string; // unique cart item id (product id + variant)
  productId: string;
  name: string;
  price: number;
  image: string;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
