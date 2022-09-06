import { HttpException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserDto } from './dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(userDto: UserDto) {
    if (await this.getByEmail(userDto.email)) {
      throw new HttpException('User with this email already exists', 401);
    }
    return this.usersRepository.create(userDto);
  }

  async getByEmail(email: string): Promise<User> {
    return await this.usersRepository.getByEmail(email);
  }
}
