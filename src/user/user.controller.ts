import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { IUserResponse } from './interfaces/user.responce';
import { LoginUserDto } from './dto/loginUser.dto';
import { User } from './decorators/user.decorator';
import { UserEntity } from './user.entity';
import { AuthGuard } from './guards/auth.guard';
import { UpdateUserDto } from './dto/updateUser.dto';

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

  @Get('user')
  @UseGuards(AuthGuard)
  async getMe(@User() user: UserEntity): Promise<IUserResponse> {
    return this.userService.buildUserResponse(user);
  }

  @Put('user')
  @UseGuards(AuthGuard)
  async updateMe(
    @User('id') idUser: string,
    @Body('user') updateUser: UpdateUserDto,
  ): Promise<IUserResponse> {
    const user = await this.userService.updateUser(idUser, updateUser);
    return this.userService.buildUserResponse(user);
  }
}
