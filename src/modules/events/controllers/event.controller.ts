import { Event } from '../models';
import { EventService } from '../services';
import { EventResponseDto } from '../dtos/responses';
import { CreateEventRequestDto, UpdateEventRequestDto } from '../dtos/requests';
import { AccessEventGuard } from '../guards';
import {
  ApiPaginationResponse,
  generatePaginateResponse,
  PaginateCollection,
  PaginateOptionsDto,
  ResponseInterceptor,
} from '@/common';
import { AuthGuard } from '@/modules/auth/guards';
import { CurrentUser } from '@/modules/auth/decorators';
import { AuthUser } from '@/modules/auth/types';
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
@UseGuards(AuthGuard)
export class EventController {
  constructor(private eventService: EventService) {}

  @Get()
  @ApiPaginationResponse(EventResponseDto)
  @UseInterceptors(new ResponseInterceptor(generatePaginateResponse(EventResponseDto)))
  async paginateEvents(
    @CurrentUser() user: AuthUser,
    @Query() paginateOptions: PaginateOptionsDto,
  ): Promise<PaginateCollection<Event>> {
    return this.eventService.paginateEvents(user, paginateOptions);
  }

  @Get(':eventId')
  @ApiResponse({ type: EventResponseDto })
  @UseGuards(AccessEventGuard)
  async findEventById(@Param('eventId') eventId: string): Promise<EventResponseDto> {
    const event = await this.eventService.findEventById(eventId);
    return plainToInstance(EventResponseDto, event);
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async createEvent(@CurrentUser() user: AuthUser, @Body() dto: CreateEventRequestDto): Promise<void> {
    await this.eventService.createEvent(user, dto);
  }

  @Put(':eventId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AccessEventGuard)
  async updateEvent(@Param('eventId') eventId: string, @Body() dto: UpdateEventRequestDto): Promise<void> {
    await this.eventService.updateEvent(eventId, dto);
  }

  @Delete(':eventId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AccessEventGuard)
  async deleteEvent(@Param('eventId') eventId: string): Promise<void> {
    await this.eventService.deleteEvent(eventId);
  }
}
