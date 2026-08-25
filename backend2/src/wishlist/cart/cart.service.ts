import { Injectable } from '@nestjs/common';
import { CreateCartDto, CreateWishlistDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { identity } from 'rxjs';

@Injectable()
export class CartService {

  constructor(private readonly prisma: PrismaService) { }
  async create(userId: string, createCartDto: CreateCartDto) {
    const cartitem = await this.prisma.cart.create({
      data: {
        userId: userId,
        productId: createCartDto.productId,
        quantity: createCartDto.quantity,
      },
      include:{
        product:true
      }
    });
    return { cartitem }
  }

   async wishcreate(userId: string, createwishlistDTO:CreateWishlistDto) {
    const wishlistitem = await this.prisma.wishlist.create({
      data: {
        userId: userId,
        productId: createwishlistDTO.productId,
      },
      include:{
        product:true,
      }
    });
    return { wishlistitem }
  }



  async findAllCartByUser(userid: string) {
    const cartlists = await this.prisma.cart.findMany({
      where: {
        userId: userid
      },
      include: {
        product: true
      }
    });
    return { cartlists };
  }

  async findAllWishlistByUser(userId: string) {
    const wishlists = await this.prisma.wishlist.findMany({
      where: {
        userId: userId,
      },
      include: {
        product: true
      }
    });
    console.log(wishlists);
    return { wishlists };
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }


  async update(userId: string, productId: string, updateCartDto: UpdateCartDto) {

    const cartitem = await this.prisma.cart.update({
      data: {
        quantity: updateCartDto.quantity
      },
      where: {
        userId_productId: {
          productId,
          userId
        }
      },
      include:{
        product:true,
      }
    });
    return { cartitem };

  }

  async remove(userId: string, productId: string) {
    const cartitem = await this.prisma.cart.delete({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
      include:{
        product:true
      }
    });
    return { cartitem };
  }

   async wishremove(userId: string, productId: string) {
    const wishlistitem = await this.prisma.wishlist.delete({
      where: {
        userId_productId: {
          userId,
          productId,
        }
      },
      include:{
        product:true,
      }
    });
    return { wishlistitem };
  }
}
