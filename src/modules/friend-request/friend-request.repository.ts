import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateFriendRequestDto,
  FriendRequestDto,
  UpdateFriendsRequestsDto,
} from './dto';
import { Prisma, ValueType } from '@prisma/client';

@Injectable()
export class FriendRequestRepository {
  constructor(private prisma: PrismaService) {}

  async findMany(filter: Prisma.FriendRequestFindManyArgs) {
    return await this.prisma.friendRequest.findMany(filter);
  }

  async findFirst(filter: Prisma.FriendRequestFindFirstArgs) {
    return await this.prisma.friendRequest.findFirst(filter);
  }

  async createFriendRequest(friendRequestDto: FriendRequestDto) {
    console.log('friendRequestDto', friendRequestDto);

    return await this.prisma.friendRequest.create({
      data: friendRequestDto,
    });
  }

  async update(
    data: UpdateFriendsRequestsDto,
    filter: {
      select?: Prisma.FriendRequestSelect;
      include?: Prisma.FriendRequestInclude;
      where: Prisma.FriendRequestWhereUniqueInput;
    },
  ) {
    return await this.prisma.friendRequest.update({
      ...filter,
      data,
    });
  }
}
