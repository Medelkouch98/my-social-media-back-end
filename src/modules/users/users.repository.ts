import { PrismaService } from './../prisma/prisma.service';
import { Injectable, Delete } from '@nestjs/common';
import { UserDto, EditUserDto } from './dto';
import { ConnectionArgsDto } from '../../core/models';
import { Prisma } from '@prisma/client';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';

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

  async getUsers(userDto: UserDto, connectionArgsDto: ConnectionArgsDto) {
    const where: Prisma.UserWhereInput = {};
    const page = await findManyCursorConnection<
      Prisma.UserGetPayload<Prisma.UserFindManyArgs>,
      Prisma.UserWhereUniqueInput
    >(
      async (args) => {
        const users = this.prisma.user.findMany({
          ...args,
          where: { ...userDto, ...where },
        });
        (await users).find((user) => {
          delete user.password;
        });
        return users;
      },
      () => {
        return this.prisma.user.count({
          where: { ...userDto, ...where },
        });
      },
      connectionArgsDto,
      {
        recordToEdge(record) {
          return {
            node: record,
          };
        },
      },
    );

    return page;
  }

  async getUserById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    delete user.password;

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
