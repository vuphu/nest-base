import { CreateEventDto, UpdateEventDto } from '../dtos';
import { Event } from '../models';
import { EventService } from '../services';
import { JwtAuthGuard } from '@/modules/auth';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('events')
@ApiTags('Events')
@UseGuards(JwtAuthGuard)
export class EventController {
  constructor(private eventService: EventService) {}

  @Get()
  @ApiResponse({ type: Event, isArray: true })
  paginateEvents(): Promise<Event[]> {
    return this.eventService.paginateEvents();
  }

  @Get(':id')
  @ApiResponse({ type: Event })
  getEventById(@Param('id') eventId: string): Promise<Event> {
    return this.eventService.getEventById(eventId);
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  createEvent(@Body() dto: CreateEventDto): Promise<void> {
    return this.eventService.createEvent(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  updateEvent(@Param('id') eventId: string, @Body() dto: UpdateEventDto): Promise<void> {
    return this.eventService.updateEvent(eventId, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteEvent(@Param('id') eventId: string): Promise<void> {
    return this.eventService.deleteEvent(eventId);
  }
}
