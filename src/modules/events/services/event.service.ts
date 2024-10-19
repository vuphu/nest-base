import { EventRepository } from '../repositories';
import { Event } from '../models';
import { CreateEventRequestDto, UpdateEventRequestDto } from '../dtos/requests';
import { PaginateCollection, PaginateOptions } from '@/common';
import { AuthUser } from '@/modules/auth/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventService {
  constructor(private eventRepository: EventRepository) {}

  paginateEvents(user: AuthUser, paginateOptions: PaginateOptions): Promise<PaginateCollection<Event>> {
    return this.eventRepository.paginate({ where: { userId: user.id } }, paginateOptions);
  }

  findEventById(eventId: string): Promise<Event> {
    return this.eventRepository.findOneBy({ id: eventId });
  }

  async createEvent(user: AuthUser, dto: CreateEventRequestDto): Promise<Event> {
    const partialEvent: Partial<Event> = {
      name: dto.name,
      startDate: dto.startDate,
      dueDate: dto.dueDate,
      description: dto.description,
      userId: user.id,
    };
    return this.eventRepository.createOne(partialEvent);
  }

  async updateEvent(eventId: string, dto: UpdateEventRequestDto): Promise<void> {
    const partialEvent: Partial<Event> = {
      name: dto.name,
      startDate: dto.startDate,
      dueDate: dto.dueDate,
      description: dto.description,
    };
    await this.eventRepository.update(eventId, partialEvent);
  }

  async deleteEvent(eventId: string): Promise<void> {
    await this.eventRepository.delete({ id: eventId });
  }
}
