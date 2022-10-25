import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FriendRequestDto, UpdateFriendsRequestsDto } from './dto';
import { Prisma } from '@prisma/client';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { ConnectionArgsDto } from '../../core/models';

@Injectable()
export class FriendRequestRepository {
  constructor(private prisma: PrismaService) {}

  async findMany(
    filter: Prisma.FriendRequestFindManyArgs,
    connectionArgsDto: ConnectionArgsDto,
  ) {
    const where: Prisma.FriendRequestWhereInput = {};
    const page = await findManyCursorConnection<
      Prisma.FriendRequestGetPayload<Prisma.FriendRequestFindManyArgs>,
      Prisma.FriendRequestWhereUniqueInput
    >(
      async (args) => {
        const friendRequest = this.prisma.friendRequest.findMany({
          ...filter,
          ...args,
          where: where,
          include: {
            receiver: true,
            sender: true,
          },
        });
        (await friendRequest).find((friendRequest) => {
          delete friendRequest.receiver.password;
          delete friendRequest.sender.password;
          delete friendRequest.receiver.createdAt;
          delete friendRequest.sender.createdAt;
          delete friendRequest.receiver.updatedAt;
          delete friendRequest.sender.updatedAt;
        });
        return friendRequest;
      },
      () => this.prisma.friendRequest.count({ where: where }),
      connectionArgsDto,
      {
        recordToEdge: (record) => ({
          node: new FriendRequestDto(record),
        }),
      },
    );
    return page;
  }

  async findFirst(filter: Prisma.FriendRequestFindFirstArgs) {
    const friendRequest = await this.prisma.friendRequest.findFirst({
      ...filter,
      include: {
        receiver: true,
        sender: true,
      },
    });
    delete friendRequest.receiver.password;
    delete friendRequest.sender.password;
    delete friendRequest.receiver.createdAt;
    delete friendRequest.sender.createdAt;
    delete friendRequest.receiver.updatedAt;
    delete friendRequest.sender.updatedAt;

    return friendRequest;
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
