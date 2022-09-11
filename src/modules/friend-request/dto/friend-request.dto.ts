import { FriendRequest, ValueType } from '@prisma/client';
import { IsDefined, IsEnum, IsString } from 'class-validator';

export class FriendRequestDto implements FriendRequest {
  @IsString()
  @IsDefined()
  receiverId: string;

  @IsString()
  @IsDefined()
  senderId: string;

  @IsEnum(ValueType)
  @IsDefined()
  status: ValueType;
}
