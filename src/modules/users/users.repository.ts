import { UserDto } from './dto/User.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, Delete } from '@nestjs/common';
import { CreateUserDto, EditUserDto } from './dto';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(_user: UserDto) {
    return await this.prisma.user.create({
      data: _user,
    });
  }

  async getUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async getUsers(_createUserDto: CreateUserDto) {
    const user = await this.prisma.user.findMany({
      where: {
        ..._createUserDto,
      },
    });
    delete user.values().next().value.password;
    delete user.values().next().value.email;

    return user;
  }

  async getUserById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    delete user.password;
    delete user.email;

    return user;
  }

  async updateUser(userId: string, _editUser: EditUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ..._editUser,
      },
    });

    delete user.password;
    delete user.createdAt;
    delete user.email;

    return user;
  }

  async deleteUser(userId: string) {
    const user = await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });

    delete user.password;
    delete user.email;
    delete user.lastname;
    delete user.firstname;
    delete user.createdAt;
    delete user.updatedAt;

    return user;
  }
}
