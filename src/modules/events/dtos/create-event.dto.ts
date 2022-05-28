import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  name: string;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  dueDate: Date;

  @IsString()
  @IsOptional()
  description: string;
}
