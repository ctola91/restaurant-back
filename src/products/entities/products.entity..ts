import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ProductType } from './ProductType';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ default: '' })
  image: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: ProductType,
    default: ProductType.DISH,
  })
  type: ProductType;
}
