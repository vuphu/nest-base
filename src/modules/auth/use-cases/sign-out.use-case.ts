import { AuthSessionService } from '../services/auth-session.service';
import { SignOutRequestDto } from '../dtos';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

export class SignOutUseCase {
  constructor(
    public userId: string,
    public sessionId: string,
    public dto: SignOutRequestDto,
  ) {}
}

@CommandHandler(SignOutUseCase)
export class SignOutHandler implements ICommandHandler<SignOutUseCase, void> {
  constructor(private authSessionService: AuthSessionService) {}

  @Transactional()
  async execute(command: SignOutUseCase): Promise<void> {
    const { userId, sessionId, dto } = command;
    if (dto.isGlobal) {
      await this.authSessionService.clearSessions(userId);
    } else {
      await this.authSessionService.deleteSession(sessionId);
    }
  }
}
