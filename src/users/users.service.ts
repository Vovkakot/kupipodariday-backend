import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import {plainToClass} from "class-transformer";
import {FindUser} from "./dto/find-user.dto";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {
    }

    async create(createUserDto: CreateUserDto) {
        const user = await this.userRepository.save(createUserDto)
        return user
    }

    async findAll() {
        const users = await this.userRepository.find();
        return users.map(user => plainToClass(User, user));
    }

    async findOne(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({id});
        return plainToClass(User, user);
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

    getByEmail(email: string) {
        return this.userRepository.findOne({
            where:
                {email: email}
        })
    }

    async findMany(searchTerm:FindUser): Promise<User[]> {
        const{query}=searchTerm
        const users = await this.userRepository.find({
            where: [
                {username: query},
                {email: query},
            ],
        });
        return users.map(user => plainToClass(User, user));
    }


    async findMe(){

    }


}
