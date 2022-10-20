import { ClassType } from './../types/class-type';
import { ApiProperty } from '@nestjs/swagger';
import { PageDto } from './page.dto';

export interface IApiResponse<T> {
  statusCode: number;
  data?: T;
  message: string;
}

export function ApiResponseDto<T extends ClassType>(
  RecordClass: T,
  isArray = false,
) {
  class ApiResponseClass implements IApiResponse<T> {
    @ApiProperty()
    statusCode: number;

    @ApiProperty({ type: RecordClass, isArray })
    data?: T;

    @ApiProperty()
    message: string;
  }
  return ApiResponseClass;
}

export function ApiPaginatedResponseDto<T extends ClassType>(Cls: T) {
  class PaginatedResponseDto extends ApiResponseDto(PageDto(Cls), true) {}
  return PaginatedResponseDto;
}
