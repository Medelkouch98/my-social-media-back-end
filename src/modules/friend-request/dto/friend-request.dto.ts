import { ApiResponseDto } from '../../../core/models';
import { ApiProperty } from '@nestjs/swagger';
import { FriendRequest, ValueType } from '@prisma/client';
import { IsDefined, IsEnum, IsObject, IsString } from 'class-validator';

export class FriendRequestDto implements FriendRequest {
  @ApiProperty()
  @IsString()
  @IsDefined()
  receiverId: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  senderId: string;

  @ApiProperty()
  @IsObject()
  @IsDefined()
  sender?: object;

  @ApiProperty()
  @IsObject()
  @IsDefined()
  receiver?: object;

  @ApiProperty()
  @IsEnum(ValueType)
  @IsDefined()
  status: ValueType;
}

export class FriendRequestClass extends ApiResponseDto(
  FriendRequestDto,
  true,
) {}
