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

  async createEvent(user: AuthUser, dto: CreateEventRequestDto): Promise<void> {
    await this.eventRepository.createOne({ ...dto, userId: user.id });
  }

  async updateEvent(eventId: string, dto: UpdateEventRequestDto): Promise<void> {
    await this.eventRepository.update({ id: eventId }, dto);
  }

  async deleteEvent(eventId: string): Promise<void> {
    await this.eventRepository.delete({ id: eventId });
  }
}
