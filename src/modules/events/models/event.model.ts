import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({ nullable: true })
  description: string;
}
