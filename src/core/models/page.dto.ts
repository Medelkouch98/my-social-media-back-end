import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ClassType } from '../types/class-type';
import { EdgeDto, IEdge } from './edge.dto';
import { PageInfo } from './page-info.dto';

export class Page<T> {
  edges: IEdge<T>[];
  pageInfo: PageInfo;
  totalCount: number;
}

export function PageDto<Record extends ClassType>(RecordClass: Record) {
  class PageClass extends Page<Record> {
    @ApiProperty({ type: () => EdgeDto(RecordClass) })
    edges: IEdge<Record>[];

    @ApiProperty()
    pageInfo: PageInfo;

    @ApiProperty()
    totalCount: number;
  }
  return PartialType(PageClass);
}
