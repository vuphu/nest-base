import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class SignOutRequestDto {
  @ApiProperty()
  @IsBoolean()
  isGlobal: boolean;
}
