import { ProductType } from '../entities/ProductType';

export class CreateProductDto {
  id?: number;
  title: string;
  description: string;
  price: number;
  image?: string;
  isActive: boolean;
  type: ProductType;
}
