import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto, CreateWishlistDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import type { Request, Response } from 'express';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post("/create")
  async create(@Req() req: Request, @Res() res: Response, @Body() createCartDto: CreateCartDto) {
    try {
      const userid = req['userInfo'].sub;
      const { cartitem } = await this.cartService.create(userid, createCartDto);
      return res.status(201).json({
        status: 201,
        message: "",
        data: cartitem
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "",
        data: null
      });

    }
  }


  @Get("/byuser")
  async findAllCartByUser(@Req() req: Request, @Res() res: Response) {
    try {
      const userid = req['userInfo'].sub;
      const { cartlists } = await this.cartService.findAllCartByUser(userid);
      return res.status(200).json({
        status: 200,
        message: "",
        data: cartlists
      });

    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "",
        data: null
      });
    }
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch('/update/:id')
  async update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto, @Req() req: Request, @Res() res: Response) {

    try {
      const userid = req['userInfo'].sub;
      const { cartitem } = await this.cartService.update(userid, id, updateCartDto);
      return res.status(200).json({
        status: 200,
        message: "",
        data: cartitem
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "",
        data: null
      });
    }
  }

  @Delete('/remove/:id')
  async remove(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    try {
      const userid = req['userInfo'].sub;
      const { cartitem } = await this.cartService.remove(userid, id);

      return res.status(200).json({
        status: 200,
        message: "",
        data: cartitem
      });

    } catch (error) {

      return res.status(400).json({
        status: 400,
        message: "",
        data: null
      });

    }

  }

  @Get("/favs/byuser")
  async findAllWishlistByUser(@Req() req: Request, @Res() res: Response) {
    try {
      const userid = req['userInfo'].sub;
      const { wishlists } = await this.cartService.findAllWishlistByUser(userid);
      return res.status(200).json({
        status: 200,
        message: "",
        data: wishlists,
      });

    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "",
        data: null
      });
    }
  }

  @Post("/favs/create")
  async wishlistcreate(@Req() req: Request, @Res() res: Response, @Body() createwishlistDTO: CreateWishlistDto) {
    try {
      const userid = req['userInfo'].sub;
      const { wishlistitem } = await this.cartService.wishcreate(userid, createwishlistDTO);
      return res.status(201).json({
        status: 201,
        message: "",
        data: wishlistitem
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "",
        data: null
      });

    }
  }

  @Delete('/favs/:id')
  async wishlistremove(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    try {
      const userid = req['userInfo'].sub;
      const { wishlistitem } = await this.cartService.wishremove(userid, id);

      return res.status(200).json({
        status: 200,
        message: "",
        data: wishlistitem
      });

    } catch (error) {

      return res.status(400).json({
        status: 400,
        message: "",
        data: null
      });

    }

  }
}
