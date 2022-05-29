import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('events')
export class Event {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ type: 'date' })
  startDate: Date;

  @ApiProperty()
  @Column({ type: 'date' })
  dueDate: Date;

  @ApiProperty()
  @Column({ nullable: true })
  description: string;
}
