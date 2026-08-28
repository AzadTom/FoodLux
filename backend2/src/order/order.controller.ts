import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import type { Request, Response } from 'express';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, @Res() res: Response, @Req() req: Request) {
    try {

      const userid = req['userInfo'].sub;
      const { createdOrderDetails } = await this.orderService.create(userid, createOrderDto);
      return res.status(200).json({
        status: 200,
        message: "",
        data: createdOrderDetails
      });

    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "",
        data: null
      });
    }
  }

  @Get('/byuser')
  async findAll(@Res() res: Response, @Req() req: Request) {
    try {
      const userid = req['userInfo'].sub;
      const { orderDetails } = await this.orderService.findAll(userid);
      return res.status(200).json({
        status: 200,
        message: "",
        data: orderDetails
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "",
        data: null
      });
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
