import { FriendRequestDto } from './friend-request.dto';
import { OmitType } from '@nestjs/swagger';

export class CreateFriendRequestDto extends OmitType(FriendRequestDto, [
  'status',
  'senderId',
] as const) {}
