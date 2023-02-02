import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { sign } from 'jsonwebtoken';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(user: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOneBy({
      email: user.email,
    });

    if (userByEmail) {
      throw new HttpException(
        'E-mail already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const createUser = new UserEntity();
    Object.assign(createUser, user);
    return await this.userRepository.save(createUser);
  }

  generateToken(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.TOKEN_SECRET,
    );
  }

  buildUserResponse(user: UserEntity): any {
    return {
      user: {
        ...user,
        token: this.generateToken(user),
      },
    };
  }
}
