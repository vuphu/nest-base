import { BaseModel } from '@/common/models';
import { Column, Entity } from 'typeorm';

@Entity('events')
export class Event extends BaseModel {
  @Column()
  name: string;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  dueDate: Date;

  @Column({ nullable: true })
  description: string;
}
