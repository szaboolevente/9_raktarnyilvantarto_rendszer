import { Part } from './Part';
export interface Product {
  id: number;
  name: string;
  parts: ProductParts[];
  requiredProducts: ProductProducts[];
}

export interface ProductParts {
  amount: number;
  part: Part;
}

export interface ProductProducts {
  amount: number;
  requiredProduct: Product;
}
