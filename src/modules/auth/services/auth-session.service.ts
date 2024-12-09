import { Injectable } from '@nestjs/common';
import { AuthSessionRepository } from '../repositories/auth-session.repository';
import { AuthSession } from '../models/auth-session.model';
import dayjs from 'dayjs';

@Injectable()
export class AuthSessionService {
  constructor(private authSessionRepository: AuthSessionRepository) {}

  findSession(sessionId: string): Promise<AuthSession | undefined> {
    return this.authSessionRepository.findOneBy({ id: sessionId });
  }

  createSession(userId: string): Promise<AuthSession> {
    const partialEntity: Partial<AuthSession> = {
      userId,
    };
    return this.authSessionRepository.createOne(partialEntity);
  }

  async refreshSession(userId: string, sessionId: string): Promise<AuthSession> {
    const session = await this.authSessionRepository.findOneByOrFail({ id: sessionId, userId });
    await this.authSessionRepository.update(session.id, { issuedAt: dayjs().toDate() });
    return session;
  }

  async deleteSession(sessionId: string): Promise<void> {
    await this.authSessionRepository.delete(sessionId);
  }

  async clearSessions(userId: string): Promise<void> {
    await this.authSessionRepository.delete({ userId });
  }
}
