import {HttpException, HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import {UsersService} from "../users/users.service";
import {CreateUserDto} from "../users/dto/create-user.dto";
@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private userService: UsersService) {
    }
    async login(dto: CreateUserDto) {
        const user = await this.validateUser(dto)
        return this.generateToken(user)
    }

    async registration(dto: CreateUserDto) {
        const candidate = await this.userService.getByEmail(dto.email)
        if (candidate){
            throw new HttpException('Пользователь с таким e-mail уже существует', HttpStatus.BAD_REQUEST)
        }
        const hashPassword =  await bcrypt.hash(dto.password,5)
        const user = await this.userService.create({...dto, password: hashPassword})
        return this.generateToken(user)
    }

    private async generateToken(user) {
        const payload = {email: user.email, id: user.id}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(dto: CreateUserDto) {
        const user = await this.userService.getByEmail(dto.email)
        if(!user){
            throw new UnauthorizedException({message:'Неверный e-mail'})
        }
        const passwordEquals = await bcrypt.compare(dto.password,user.password)
        if (user && passwordEquals){
            return user
        }
        throw new UnauthorizedException({message:'Неверный пароль'})
    }
}