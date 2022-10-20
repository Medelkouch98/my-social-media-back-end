import { FriendRequestDto } from './friend-request.dto';
import { OmitType } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/core/models';

export class CreateFriendRequest extends OmitType(FriendRequestDto, [
  'status',
  'senderId',
] as const) {}

export class CreateFriendRequestDto extends ApiResponseDto(
  CreateFriendRequest,
) {}
