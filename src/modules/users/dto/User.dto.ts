import { OmitEntity } from './../../../helpers/entity';
import { User } from '@prisma/client';
import { IsEmail, IsString } from 'class-validator';

export class UserDto implements OmitEntity<User> {
  @IsEmail()
  email: string;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  password: string;
}
