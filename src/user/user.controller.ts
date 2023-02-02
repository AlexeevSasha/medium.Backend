import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './user.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  async createUser(@Body('user') user: CreateUserDto): Promise<UserEntity> {
    const users = await this.userService.createUser(user);
    return this.userService.buildUserResponse(users);
  }
}
