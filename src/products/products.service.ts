import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/products.entity.';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductType } from './entities/ProductType';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find();
  }

  async findOne(id: number): Promise<Product | null> {
    return await this.productsRepository.findOneBy({ id });
  }

  async create(
    title: string,
    description: string,
    price: number,
    type: ProductType,
    image?: string,
  ) {
    try {
      return await this.productsRepository.save({
        title,
        description,
        price,
        type,
        image,
      });
    } catch (e) {
      console.log(e);
      throw BadRequestException;
    }
  }

  async update(id, title, description, price, type, image) {
    try {
      return await this.productsRepository.update(id, {
        title,
        description,
        price,
        type,
        image,
      });
    } catch (e) {
      console.log(e);
      throw BadRequestException;
    }
  }

  async remove(id: number) {
    try {
      return await this.productsRepository.delete(id);
    } catch (e) {
      console.log(e);
      throw BadRequestException;
    }
  }
}
