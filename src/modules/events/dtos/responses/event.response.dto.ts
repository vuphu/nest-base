import { BaseResponseDto } from '@/common/dtos/responses/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class EventDto extends BaseResponseDto {
  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty({ name: 'start_date' })
  @Expose()
  startDate: Date;

  @ApiProperty({ name: 'due_date' })
  @Expose()
  dueDate: Date;

  @ApiProperty()
  @Expose()
  description: string;
}
