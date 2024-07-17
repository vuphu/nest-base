import { Event } from '../models';
import { EventService } from '../services';
import { EventDto } from '../dtos/responses';
import { CreateEventDto, UpdateEventDto } from '../dtos/requests';
import { JwtAuthGuard } from '@/modules/auth';
import {
  ApiPaginationResponse,
  generatePaginateResponse,
  PaginateCollection,
  PaginateOptionsDto,
  ResponseInterceptor,
} from '@/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

@Controller('events')
@ApiTags('Events')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class EventController {
  constructor(private eventService: EventService) {}

  @Get()
  @ApiPaginationResponse(EventDto)
  @UseInterceptors(new ResponseInterceptor(generatePaginateResponse(EventDto)))
  async paginateEvents(@Query() paginateOptions: PaginateOptionsDto): Promise<PaginateCollection<Event>> {
    return this.eventService.paginateEvents(paginateOptions);
  }

  @Get(':id')
  @ApiResponse({ type: EventDto })
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
