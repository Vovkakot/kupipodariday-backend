import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateWishlistDto} from './dto/create-wishlist.dto';
import {UpdateWishlistDto} from './dto/update-wishlist.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Wishlist} from "./entities/wishlist.entity";
import {Repository} from "typeorm";

@Injectable()
export class WishlistsService {
    constructor(@InjectRepository(Wishlist) private wishListRepository: Repository<Wishlist>) {
    }

    create(createWishlistDto: CreateWishlistDto) {
        return this.wishListRepository.create(createWishlistDto);
    }

    findAll() {
        return this.wishListRepository.find();
    }

    findOne(id: number) {
        return this.wishListRepository.findOneBy({id});
    }

    update(id: number, updateWishlistDto: UpdateWishlistDto) {
        const wishList = this.findOne(id)
        if (!wishList) {
            throw new NotFoundException()
        }
        return this.wishListRepository.update({id}, updateWishlistDto);
    }

    remove(id: number) {
        return this.wishListRepository.delete({id});
    }
}
