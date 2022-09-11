import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { CreateUserDto, EditUserDto } from './dto';
import { UsersService } from './users.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(createUserDto: CreateUserDto) {
    return this.usersService.getUsers(createUserDto);
  }

  @Get(':id')
  getUserById(@Param('id') userId: string) {
    return this.usersService.getUserById(userId);
  }

  @Patch(':id')
  updateUser(@Param('id') userId: string, @Body() editUser: EditUserDto) {
    return this.usersService.updateUser(userId, editUser);
  }

  @Delete(':id')
  deleteUser(@Param('id') userId: string) {
    return this.usersService.deleteUser(userId);
  }
}
