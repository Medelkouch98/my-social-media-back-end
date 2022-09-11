import { UpdateFriendsRequestsDto } from './dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateFriendRequestDto } from './dto';
import { FriendRequestService } from './friend-request.service';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../users/decorator';
import { User, ValueType } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('friend-request')
export class FriendRequestController {
  constructor(private readonly friendRequestService: FriendRequestService) {}

  @Get()
  getUserRequests(@GetUser() user: User) {
    return this.friendRequestService.getRequests(user.id);
  }

  @Post()
  createFriendRequest(
    @GetUser() user: User,
    @Body() createFriendRequestDto: CreateFriendRequestDto,
  ) {
    return this.friendRequestService.createFriendRequest({
      ...createFriendRequestDto,
      senderId: user.id,
      status: ValueType.PANDDING,
    });
  }

  @Patch(':senderId')
  updateFriendRequestStatus(
    @Param('senderId') senderId: string,
    @GetUser() user: User,
    @Body() updateFriendsRequestsDto: UpdateFriendsRequestsDto,
  ) {
    return this.friendRequestService.updateFriendRequestStatus({
      senderId,
      receiverId: user.id,
      status: updateFriendsRequestsDto.status,
    });
  }
}
