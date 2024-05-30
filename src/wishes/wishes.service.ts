import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Wish} from "./entities/wish.entity";
import {Repository} from "typeorm";
import {CreateWishDto} from "./dto/create-wish.dto";

@Injectable()
export class WishesService {

    constructor(@InjectRepository(Wish) private wishRepository: Repository<Wish>) {
    }

    create(createWishDto: CreateWishDto) {
        return this.wishRepository.save(createWishDto)
    }

    findAll() {
        return this.wishRepository.find()
    }

    findById(id) {
        return this.wishRepository.findOneBy({id})
    }

    delete(id) {
        this.wishRepository.delete({id})
    }

    update(id, createWishDto: CreateWishDto) {
        const wish = this.findById(id)
        if (!wish) {
            throw new NotFoundException()
        }
        return this.wishRepository.update({id}, createWishDto)
    }
}
