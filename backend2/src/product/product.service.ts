import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from './entities/product.entity';


export type ProductResponse<T> = {
  status: number;
  message: string;
  data: T;
};

@Injectable()
export class ProductService {


   constructor(private readonly prisma: PrismaService) {}
  async create(
    createProductDto: CreateProductDto,
  ): Promise<ProductResponse<Product>> {
    const product = await this.prisma.product.create({
      data: createProductDto
    });

    return {
      status: 201,
      message: 'Product created successfully',
      data: product,
    };
  }

  async findAll(): Promise<ProductResponse<Product[]>> {
    const products = await this.prisma.product.findMany();
    return {
      status: 200,
      message: 'Products fetched successfully',
      data: products,
    }
  }

  async findAllCategories(){
    const categories = await this.prisma.category.findMany();
    return {
      status: 200,
      message: 'Categories fetched successfully',
      data: categories,
    };
  }

  async findAllCategoryList(id:string):Promise<ProductResponse<Product[]>>{
    const categories = await this.prisma.product.findMany({
      where:{
        categoryId:id
      }
    });

    return {
      status: 200,
      message: 'Categories with products fetched successfully',
      data: categories,
    };
  }



  async findOne(id: string): Promise<ProductResponse<Product | null>> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    return {
      status: 200,
      message: 'Product fetched successfully',
      data: product,
    };
  }

  async update(
    id: string,
    _updateProductDto: UpdateProductDto,
  ): Promise<ProductResponse<Product>> {
    const product = await this.prisma.product.update({
      where: { id },
      data: _updateProductDto,
    });
    return {
      status: 200,
      message: 'Product updated successfully',
      data: product,
    };
  }

  async remove(id: string): Promise<ProductResponse<Product>> {
    const product = await this.prisma.product.delete({
      where: { id },
    });
    return {
      status: 200,
      message: 'Product deleted successfully',
      data: product,
    };
  }
}
