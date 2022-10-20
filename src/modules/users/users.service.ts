import { HttpException, Injectable } from '@nestjs/common';
import { ConnectionArgsDto } from '../../core/models';
import { UserRequestsDto } from '../friend-request/dto';
import { CreateUserDto, EditUserDto, UserDto } from './dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(userDto: UserDto) {
    if (await this.getUserByEmail(userDto.email)) {
      throw new HttpException('User with this email already exists', 401);
    }
    return this.usersRepository.create(userDto);
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.getUserByEmail(email);
  }

  async getUsers(userDto: UserDto, connectionArgsDto: ConnectionArgsDto) {
    return await this.usersRepository.getUsers(userDto, connectionArgsDto);
  }

  async getUserById(userId: string) {
    return await this.usersRepository.getUserById(userId);
  }

  async updateUser(userId: string, editUserDto: EditUserDto) {
    return await this.usersRepository.updateUser(userId, editUserDto);
  }

  async deleteUser(userId: string) {
    return await this.usersRepository.deleteUser(userId);
  }
}
