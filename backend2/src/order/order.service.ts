import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) { }
  async create(userId: string, createOrderDto: CreateOrderDto) {
    const createdOrderDetails = await this.prisma.order.create({
      data: {
        userId: userId,
        totalAmount: createOrderDto.totalAmount,
        image: createOrderDto.image,
        paymentId: createOrderDto.paymentId,
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
            product: true,
            order:true,
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
      },
      include: {
        _count: {
          select: {
            items: true
          }
        }
      }
    });
    return { orderDetails };
  }

  async findOne(id: string) {

    const orderdetails = await this.prisma.orderItem.findMany({
      where: {
        orderId: id,
      },
      include: {
        product: true,
        order: true
      }
    });

    return { orderdetails }
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
