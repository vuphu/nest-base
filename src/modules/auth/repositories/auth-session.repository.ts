import { BaseRepository } from '@/common';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { AuthSession } from '../models/auth-session.model';

@Injectable()
export class AuthSessionRepository extends BaseRepository<AuthSession> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(AuthSession, dataSource.createEntityManager());
  }
}
