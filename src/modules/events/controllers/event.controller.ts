import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateEventDto } from '../dtos/create-event.dto';
import { UpdateEventDto } from '../dtos/update-event.dto';
import { EventService } from '../services/event.service';
import { Event } from '../models/event.model';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@Controller('events')
@UseGuards(JwtAuthGuard)
export class EventController {
  constructor(private eventService: EventService) {}

  @Get()
  paginateEvents(): Promise<Event[]> {
    return this.eventService.paginateEvents();
  }

  @Get(':id')
  getEventById(@Param('id') eventId: string): Promise<Event> {
    return this.eventService.getEventById(eventId);
  }

  @Post()
  createEvent(@Body() dto: CreateEventDto): Promise<void> {
    return this.eventService.createEvent(dto);
  }

  @Put(':id')
  updateEvent(@Param('id') eventId: string, @Body() dto: UpdateEventDto): Promise<void> {
    return this.eventService.updateEvent(eventId, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteEvent(@Param('id') eventId: string): Promise<void> {
    return this.eventService.deleteEvent(eventId);
  }
}
