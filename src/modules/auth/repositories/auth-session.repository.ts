import { AuthSession } from '../models/auth-session.model';
import { BaseRepository } from '@/common';
import { Injectable } from '@nestjs/common';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterTypeOrm } from '@nestjs-cls/transactional-adapter-typeorm';

@Injectable()
export class AuthSessionRepository extends BaseRepository<AuthSession> {
  constructor(txHost: TransactionHost<TransactionalAdapterTypeOrm>) {
    super(txHost, AuthSession);
  }
}
