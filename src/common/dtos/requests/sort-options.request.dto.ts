import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class SortOptionsDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  sortField: string;

  @ApiPropertyOptional()
  @IsEnum(['asc', 'desc'])
  @IsOptional()
  sortOrder: 'asc' | 'desc';
}
