import { EventRepository } from '../repositories';
import { AuthUser } from '@/modules/auth/types';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { isNil } from 'lodash';

@Injectable()
export class AccessEventGuard implements CanActivate {
  constructor(private eventRepository: EventRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: AuthUser = request.user;
    const eventId = request.params['eventId'];

    if (isNil(user) || isNil(eventId)) {
      return false;
    }

    return this.eventRepository.existsBy({ id: eventId, userId: user.id });
  }
}
