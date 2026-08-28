import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma:PrismaService){}
  async create(userId:string,createOrderDto: CreateOrderDto) {
    const createdOrderDetails = await this.prisma.order.createMany({
      data:createOrderDto.items.map((item)=>({
        totalAmount:createOrderDto.totalAmount,
        userId:userId,
        items:item,
      }))
    });

    return {
      createdOrderDetails
    }
  }

  async findAll(userId:string) {
    
    const orderDetails = await this.prisma.order.findMany({
      where:{
        userId:userId
      }
    });
    return {orderDetails};
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
