import { ApiPaginatedResponseDto, ConnectionArgsDto } from '../../core/models';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard';
import { UserRequestsDto } from '../friend-request/dto';
import { CreateUserDto, EditUserDto, UserClass, UserDto } from './dto';
import { UsersService } from './users.service';

@UseGuards(JwtGuard)
@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ type: ApiPaginatedResponseDto(UserDto) })
  @ApiBearerAuth()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  getUsers(userDto: UserDto, connectionArgsDto: ConnectionArgsDto) {
    return this.usersService.getUsers(userDto, connectionArgsDto);
  }

  @Get(':id')
  @ApiOkResponse({ type: UserClass })
  @ApiBearerAuth()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  getUserById(@Param('id') userId: string) {
    return this.usersService.getUserById(userId);
  }

  @ApiCreatedResponse({ type: UserClass })
  @ApiBearerAuth()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @Patch(':id')
  updateUser(@Param('id') userId: string, @Body() editUser: EditUserDto) {
    return this.usersService.updateUser(userId, editUser);
  }

  @ApiCreatedResponse({ type: UserClass })
  @ApiBearerAuth()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @Delete(':id')
  deleteUser(@Param('id') userId: string) {
    return this.usersService.deleteUser(userId);
  }
}
