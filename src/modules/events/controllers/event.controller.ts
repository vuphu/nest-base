import { Event } from '../models';
import { EventService } from '../services';
import { EventDto } from '../dtos/responses';
import { CreateEventDto, UpdateEventDto } from '../dtos/requests';
import { JwtAuthGuard } from '@/modules/auth';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

@Controller('events')
@ApiTags('Events')
@UseGuards(JwtAuthGuard)
export class EventController {
  constructor(private eventService: EventService) {}

  @Get()
  @ApiResponse({ type: Event, isArray: true })
  async paginateEvents(): Promise<EventDto[]> {
    const events = await this.eventService.paginateEvents();
    return plainToInstance(EventDto, events);
  }

  @Get(':id')
  @ApiResponse({ type: Event })
  async getEventById(@Param('id') eventId: string): Promise<EventDto> {
    const event = await this.eventService.getEventById(eventId);
    return plainToInstance(EventDto, event);
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async createEvent(@Body() dto: CreateEventDto): Promise<void> {
    await this.eventService.createEvent(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateEvent(@Param('id') eventId: string, @Body() dto: UpdateEventDto): Promise<void> {
    await this.eventService.updateEvent(eventId, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteEvent(@Param('id') eventId: string): Promise<void> {
    await this.eventService.deleteEvent(eventId);
  }
}
