import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ConnectionArgsDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false })
  first?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false })
  last?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  after?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  before?: string;
}
