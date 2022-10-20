import { User } from '@prisma/client';
import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserRequestsDto
  implements Omit<User, 'createdAt' | 'updatedAt' | 'password' | 'email'>
{
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsString()
  lastname: string;
}
