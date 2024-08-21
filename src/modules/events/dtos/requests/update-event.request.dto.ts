import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateEventRequestDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsDateString()
  @IsOptional()
  startDate: Date;

  @IsDateString()
  @IsOptional()
  dueDate: Date;

  @IsString()
  @IsOptional()
  description: string;
}
