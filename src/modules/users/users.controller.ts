import {
  ApiPaginatedResponseDto,
  ConnectionArgsDto,
  PageDto,
} from '../../core/models';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard';
import { EditUserDto, UserClass, UserDto } from './dto';
import { UsersService } from './users.service';
import { ApiPageResponse } from '../../core/decorators/api-page-response.decorator';

@UseGuards(JwtGuard)
@Controller('users')
@ApiTags('users')
@ApiExtraModels(PageDto, ApiPaginatedResponseDto)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiBearerAuth()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiOkResponse({ type: ApiPaginatedResponseDto(UserClass) })
  @ApiPageResponse(ApiPaginatedResponseDto(UserClass))
  @Get()
  getUsers(userDto: UserDto, @Query() connectionArgsDto: ConnectionArgsDto) {
    return this.usersService.getUsers(userDto, connectionArgsDto);
  }

  @ApiBearerAuth()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiOkResponse({ type: UserClass })
  @Get(':id')
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
