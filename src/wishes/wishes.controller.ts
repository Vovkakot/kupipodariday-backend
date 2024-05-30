import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {WishesService} from './wishes.service';
import {CreateWishDto} from "./dto/create-wish.dto";

@Controller('wishes')
export class WishesController {
    constructor(private readonly wishesService: WishesService) {
    }

    @Post()
    create(@Body() createWishDto: CreateWishDto) {
        return this.wishesService.create(createWishDto)
    }

    @Get()
    findAll() {
        return this.wishesService.findAll()
    }

    @Get('id')
    findOne(@Param('id') id: string) {
        return this.wishesService.findById(id)
    }

    @Patch('id')
    update(@Param('id') id: string, @Body() creteWishDto: CreateWishDto) {
        return this.wishesService.update(id, creteWishDto)
    }

    @Delete('id')
    remove(@Param('id') id: string) {
        return this.wishesService.delete(id)
    }
}
