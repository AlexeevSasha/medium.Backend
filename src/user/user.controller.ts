import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { IUserResponse } from './interfaces/user.responce';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @UsePipes(new ValidationPipe())
  async createUser(@Body('user') user: CreateUserDto): Promise<IUserResponse> {
    const users = await this.userService.createUser(user);
    return this.userService.buildUserResponse(users);
  }

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async login(@Body('user') login: LoginUserDto): Promise<IUserResponse> {
    const user = await this.userService.login(login);
    return this.userService.buildUserResponse(user);
  }
}
