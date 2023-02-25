import { EventRepository } from '../repositories';
import { Event } from '../models';
import { CreateEventDto, UpdateEventDto } from '../dtos/requests';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventService {
  constructor(private eventRepository: EventRepository) {}

  paginateEvents(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  getEventById(eventId: string): Promise<Event> {
    return this.eventRepository.findOneBy({ id: eventId });
  }

  async createEvent(dto: CreateEventDto): Promise<void> {
    await this.eventRepository.insert(dto);
  }

  async updateEvent(eventId: string, dto: UpdateEventDto): Promise<void> {
    await this.eventRepository.update({ id: eventId }, dto);
  }

  async deleteEvent(eventId: string): Promise<void> {
    await this.eventRepository.delete({ id: eventId });
  }
}
