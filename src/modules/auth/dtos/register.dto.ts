import { UserDto } from './../../users/dto/User.dto';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto extends UserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstname: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastname: string;
}
