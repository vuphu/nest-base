import { BaseModel } from '@/common/models';
import { Column, Entity } from 'typeorm';

@Entity('auth_sessions')
export class AuthSession extends BaseModel {
  @Column()
  userId: string;

  @Column({ type: 'timestamp' })
  issuedAt: Date;
}
