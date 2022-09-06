import { UsersService } from './../../users/users.service';
import { PrismaService } from '../../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { LoginDto, RegisterDto } from '../dtos';
import { IAuthRepository } from './Iauth.repository';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    private prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async register(registerDto: RegisterDto) {
    const password = await argon.hash(registerDto.password);
    try {
      const user = await this.usersService.create({ ...registerDto, password });

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.getByEmail(loginDto.email);

    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }

    const passwordMatch = await argon.verify(user.password, loginDto.password);

    if (!passwordMatch) {
      throw new ForbiddenException('Invalid credentials');
    }

    return user;
  }
}
