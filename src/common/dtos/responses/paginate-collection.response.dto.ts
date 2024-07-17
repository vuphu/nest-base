import { ApiProperty } from '@nestjs/swagger';
import { ClassConstructor, Expose, Type } from 'class-transformer';
import { IsNumber, ValidateNested } from 'class-validator';

export class PaginateCollectionDto<T> {
  @ApiProperty({})
  @Expose()
  items: T[];

  @ApiProperty()
  @IsNumber()
  total: number;

  @ApiProperty()
  @IsNumber()
  page: number;

  @ApiProperty()
  @IsNumber()
  limit: number;
}

export function generatePaginateResponse<T>(cls: ClassConstructor<T>) {
  class ResponseDto extends PaginateCollectionDto<T> {
    @ValidateNested({ each: true })
    @Type(() => cls)
    @Expose()
    items: T[];
  }
  return ResponseDto;
}
