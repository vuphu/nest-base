import { BaseModel } from '@/common/models';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User extends BaseModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'character varying' })
  email: string;

  @Column({ type: 'character varying' })
  password: string;
}
