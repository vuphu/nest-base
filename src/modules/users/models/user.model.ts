import { BaseModel } from '@/common/models';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User extends BaseModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column({ select: false })
  password?: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;
}
