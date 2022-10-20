import { ApiProperty } from '@nestjs/swagger';
import { ClassType } from '../types/class-type';

export interface IEdge<T> {
  cursor: string;
  node: T;
}

export function EdgeDto<Record extends ClassType>(RecordClass: Record) {
  class EdgeClass implements IEdge<Record> {
    @ApiProperty()
    cursor: string;
    @ApiProperty({ type: RecordClass })
    node: Record;
  }
  return EdgeClass;
}
