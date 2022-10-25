import { User } from '@prisma/client';
import { IsDate, IsEmail, IsString } from 'class-validator';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ApiResponseDto } from '../../../core/models';

export class UserDto implements User {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}

export class UserClass extends ApiResponseDto(
  OmitType(UserDto, ['password', 'createdAt', 'updatedAt'] as const),
  true,
) {}
