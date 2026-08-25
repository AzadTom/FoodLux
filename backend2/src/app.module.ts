import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './wishlist/cart/cart.module';
import { WishlistService } from './wishlist/wishlist.service';
import { CartMiddleware } from './wishlist/cart/cart.middleware';
import { CartController } from './wishlist/cart/cart.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, ProductModule, CartModule],
  controllers: [AppController],
  providers: [AppService, WishlistService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CartMiddleware)
      .forRoutes(CartController);
  }
}
