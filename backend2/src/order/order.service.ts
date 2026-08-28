import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) { }
  async create(userId: string, createOrderDto: CreateOrderDto) {
    const createdOrderDetails = await this.prisma.order.create({
      data: {
        userId: userId,
        totalAmount: createOrderDto.totalAmount,
        items: {
          create: createOrderDto.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true
          }
        },
      },
    });

    await this.prisma.cart.deleteMany({
      where: {
        userId: userId,
      }
    });

    return {
      createdOrderDetails
    }
  }

  async findAll(userId: string) {

    const orderDetails = await this.prisma.order.findMany({
      where: {
        userId: userId
      }
    });
    return { orderDetails };
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
