import { Product } from "./Product";

export interface Order {
  id: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderDate: string;
  product: Product;
  amount: number;
}
