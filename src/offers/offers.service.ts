import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateOfferDto} from './dto/create-offer.dto';
import {UpdateOfferDto} from './dto/update-offer.dto';
import {Offer} from "./entities/offer.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class OffersService {
    constructor(@InjectRepository(Offer) private offerRepository: Repository<Offer>) {
    }

    create(createOfferDto: CreateOfferDto) {
        return this.offerRepository.save(createOfferDto);
    }

    findAll() {
        return this.offerRepository.find();
    }

    findOne(id: number) {
        return this.offerRepository.findOneBy({id});
    }

    update(id: number, updateOfferDto: UpdateOfferDto) {
        const offer = this.findOne(id)
        if (!offer) {
            throw new NotFoundException()
        }
        return this.offerRepository.update({id}, updateOfferDto);
    }

    remove(id: number) {
        return this.offerRepository.delete({id});
    }
}
