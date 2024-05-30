import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {
    }

    create(createUserDto: CreateUserDto) {
        return this.userRepository.create(createUserDto)
    }

    findAll() {
        return this.userRepository.find();
    }

    findOne(id: number) {
        return this.userRepository.findOneBy({id});
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        const user = this.findOne(id)
        if (!user) {
            throw new NotFoundException()
        }
        return this.userRepository.update({id}, updateUserDto);
    }

    remove(id: number) {
        return this.userRepository.delete({id});
    }
}
