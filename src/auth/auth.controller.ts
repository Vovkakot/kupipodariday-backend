import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/signup')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
