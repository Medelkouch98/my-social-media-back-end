import { PickType } from '@nestjs/swagger';
import { UserDto } from './User.dto';

export class EditUserDto extends PickType(UserDto, [
  'email',
  'firstname',
  'lastname',
] as const) {}
