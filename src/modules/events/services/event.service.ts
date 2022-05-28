import { Injectable } from '@nestjs/common';
import { CreateEventDto } from '../dtos/create-event.dto';
import { UpdateEventDto } from '../dtos/update-event.dto';
import { Event } from '../models/event.model';
import { EventRepository } from '../repositories/event.repository';

@Injectable()
export class EventService {
  constructor(private eventRepository: EventRepository) {}

  paginateEvents(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  getEventById(eventId: string): Promise<Event> {
    return this.eventRepository.findOne({ id: eventId });
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
