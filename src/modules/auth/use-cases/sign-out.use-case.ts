import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthSessionService } from '../services/auth-session.service';
import { SignOutRequestDto } from '../dtos';

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

  async execute(command: SignOutUseCase): Promise<void> {
    const { userId, sessionId, dto } = command;
    if (dto.isGlobal) {
      await this.authSessionService.clearSessions(userId);
    } else {
      await this.authSessionService.deleteSession(sessionId);
    }
  }
}
