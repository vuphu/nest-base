import { BaseResponseDto } from '@/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class EventResponseDto extends BaseResponseDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDate()
  startDate: Date;

  @ApiProperty()
  @IsDate()
  dueDate: Date;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;
}
