import { OmitEntity } from './../../../helpers/entity';
import { User } from '@prisma/client';
import { IsEmail, IsString } from 'class-validator';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ApiResponseDto } from '../../../core/models';

export class UserDto implements OmitEntity<User> {
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
}

export class UserClass extends ApiResponseDto(
  OmitType(UserDto, ['password'] as const),
  true,
) {}
