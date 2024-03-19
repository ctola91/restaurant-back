import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get('')
  async findAll() {
    return await this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: { id: number }) {
    const id = params.id;
    return await this.productService.findOne(id);
  }

  @Post('')
  async create(@Body() productDto: CreateProductDto) {
    return await this.productService.create(
      productDto.title,
      productDto.description,
      productDto.price,
      productDto.type,
      productDto.image,
    );
  }

  @Put('')
  async update(@Body() productDto: CreateProductDto) {
    return await this.productService.update(
      productDto.id,
      productDto.title,
      productDto.description,
      productDto.price,
      productDto.type,
      productDto.image,
    );
  }

  @Delete(':id')
  async remove(@Param() params: { id: number }) {
    const id = params.id;
    return await this.productService.remove(id);
  }
}
