export interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  images: string[];
  description?: string;
}
