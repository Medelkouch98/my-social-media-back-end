import { PickType } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { UserDto } from './User.dto';

export class RegisterDto extends PickType(UserDto, [
  'email',
  'firstname',
  'lastname',
  'password',
] as const) {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
