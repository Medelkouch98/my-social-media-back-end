import { IsString } from 'class-validator';

export class EditUserDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;
}
