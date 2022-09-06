import { UserDto } from './../../users/dto/User.dto';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class RegisterDto extends UserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;
}
