import { Injectable, HttpException } from '@nestjs/common';
import { ConnectionArgsDto } from '../../core/models';
import { FriendRequestDto } from './dto';
import { FriendRequestRepository } from './friend-request.repository';

@Injectable()
export class FriendRequestService {
  constructor(private friendRequestRepository: FriendRequestRepository) {}

  async getRequests(userId: string, connectionArgsDto: ConnectionArgsDto) {
    console.log('senderId', userId);
    return await this.friendRequestRepository.findMany(
      {
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
      },
      connectionArgsDto,
    );
  }

  async getUserReceivedRequests(receivedId: string) {
    return await this.friendRequestRepository.findFirst({
      where: {
        receiverId: receivedId,
      },
    });
  }

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
