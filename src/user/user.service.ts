import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { sign } from 'jsonwebtoken';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserResponse } from './interfaces/user.responce';
import { LoginUserDto } from './dto/loginUser.dto';
import { compare } from 'bcrypt';
import { Expose } from 'class-transformer';

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

  async login(user: LoginUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      where: { email: user.email },
      select: ['password', 'images', 'email', 'bio', 'username'],
    });
    if (!userByEmail) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const isPassword = await compare(user.password, userByEmail.password);
    if (!isPassword) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    delete userByEmail.password;

    return userByEmail;
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

  buildUserResponse(user: UserEntity): IUserResponse {
    return {
      user: {
        ...user,
        token: this.generateToken(user),
      },
    };
  }
}
