import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsUUID } from 'class-validator';

export class BaseResponseDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;
}
