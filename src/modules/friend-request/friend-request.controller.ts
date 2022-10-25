import { FriendRequestClass, FriendRequestDto } from './dto/friend-request.dto';
import { CreateFriendRequest, UpdateFriendsRequestsDto } from './dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../users/decorator';
import { User, ValueType } from '@prisma/client';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  ApiPaginatedResponseDto,
  ConnectionArgsDto,
  PageDto,
} from '../../core/models';
import { ApiPageResponse } from '../../core/decorators/api-page-response.decorator';

@UseGuards(JwtGuard)
@Controller('api/friend-request')
@ApiTags('friend-request')
@ApiExtraModels(PageDto, ApiPaginatedResponseDto)
export class FriendRequestController {
  constructor(private readonly friendRequestService: FriendRequestService) {}

  @ApiBearerAuth()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiPageResponse(ApiPaginatedResponseDto(FriendRequestDto))
  @Get()
  getUserRequests(
    @GetUser() user: User,
    @Query() connectionArgsDto: ConnectionArgsDto,
  ) {
    return this.friendRequestService.getRequests(user.id, connectionArgsDto);
  }

  @ApiBearerAuth()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiOkResponse({ type: [FriendRequestClass] })
  @Get('user-sent-requests')
  getUserSentRequests(@Param('receivedId') receivedId: string) {
    return this.friendRequestService.getUserReceivedRequests(receivedId);
  }

  @ApiBearerAuth()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiCreatedResponse({ type: FriendRequestClass })
  @Post('user-send-request')
  createFriendRequest(
    @GetUser() user: User,
    @Body() createFriendRequestDto: CreateFriendRequest,
  ) {
    return this.friendRequestService.createFriendRequest({
      ...createFriendRequestDto,
      senderId: user.id,
      status: ValueType.PANDDING,
    });
  }

  @ApiBearerAuth()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiCreatedResponse({ type: FriendRequestClass })
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
