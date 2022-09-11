import { PickType } from '@nestjs/swagger';
import { FriendRequestDto } from './friend-request.dto';

export class UpdateFriendsRequestsDto extends PickType(FriendRequestDto, [
  'status',
] as const) {}
