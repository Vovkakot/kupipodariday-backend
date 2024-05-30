import { Module } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { WishesController } from './wishes.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Wish} from "./entities/wish.entity";
import {Wishlist} from "../wishlists/entities/wishlist.entity";

@Module({
  controllers: [WishesController],
  providers: [WishesService],
  imports: [TypeOrmModule.forFeature([Wish, Wishlist])],
})
export class WishesModule {}
