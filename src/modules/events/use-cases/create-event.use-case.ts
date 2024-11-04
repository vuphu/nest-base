import { CreateEventRequestDto } from '../dtos';
import { Event } from '../models';
import { EventCreatedEvent } from '../cqrs/event-created-event.cqrs';
import { EventRepository } from '../repositories';
import { AuthUser } from '@/modules/auth/types';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

export class CreateEventUseCase {
  constructor(
    public dto: CreateEventRequestDto,
    public user: AuthUser,
  ) {}
}

@CommandHandler(CreateEventUseCase)
export class CreateEventHandler implements ICommandHandler<CreateEventUseCase, Event> {
  constructor(
    private eventRepository: EventRepository,
    private eventBus: EventBus,
  ) {}

  async execute(command: CreateEventUseCase): Promise<Event> {
    const { dto, user } = command;

    const partialEvent: Partial<Event> = {
      name: dto.name,
      startDate: dto.startDate,
      dueDate: dto.dueDate,
      description: dto.description,
      userId: user.id,
    };

    const event = await this.eventRepository.createOne(partialEvent);
    this.eventBus.publish(new EventCreatedEvent(event.id));

    return event;
  }
}
