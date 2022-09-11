import { Injectable, HttpException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateFriendRequestDto, FriendRequestDto } from './dto';
import { FriendRequestRepository } from './friend-request.repository';

@Injectable()
export class FriendRequestService {
  constructor(private friendRequestRepository: FriendRequestRepository) {}

  async getRequests(userId: string) {
    console.log('senderId', userId);
    return await this.friendRequestRepository.findMany({
      where: {
        OR: [
          {
            senderId: userId,
          },
          {
            receiverId: userId,
          },
        ],
      },
    });
  }

  // async getUserReceivedRequests(receivedId: string) {
  //   return await this.friendRequestRepository.getUserReceivedRequests(
  //     receivedId,
  //   );
  // }

  async createFriendRequest(friendRequestDto: FriendRequestDto) {
    if (friendRequestDto.senderId === friendRequestDto.receiverId)
      throw new HttpException(
        'You can not send friend request to yourself',
        400,
      );
    return await this.friendRequestRepository.createFriendRequest(
      friendRequestDto,
    );
  }

  async updateFriendRequestStatus(friendRequestDto: FriendRequestDto) {
    return this.friendRequestRepository.update(
      {
        status: friendRequestDto.status,
      },
      {
        where: {
          receiverId_senderId: {
            receiverId: friendRequestDto.receiverId,
            senderId: friendRequestDto.senderId,
          },
        },
      },
    );
  }
  // async updateFriendRequestStatus(
  //   updateFriendsRequestsStatusDto: UpdateFriendsRequestsStatusDto,
  // ) {
  //   return await this.friendRequestRepository.updateFriendRequestStatus(
  //     updateFriendsRequestsStatusDto,
  //   );
  // }
}
