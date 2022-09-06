import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserDto } from './dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(userDto: UserDto) {
    return this.usersRepository.create(userDto);
  }

  async getByEmail(email: string): Promise<User> {
    return await this.usersRepository.getByEmail(email);
  }
}
