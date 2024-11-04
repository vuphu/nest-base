import { EventRepository } from '../repositories';
import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

export class EventCreatedEvent {
  constructor(public eventId: string) {}
}

@EventsHandler(EventCreatedEvent)
export class EventCreatedHandler implements IEventHandler<EventCreatedEvent> {
  constructor(private eventRepository: EventRepository) {}

  async handle(event: EventCreatedEvent): Promise<void> {
    const { name } = await this.eventRepository.findOneByOrFail({ id: event.eventId });
    Logger.log(`The event "${name}" was just created`);
  }
}
