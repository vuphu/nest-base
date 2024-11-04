import { Event } from '../models';
import { EventService } from '../services';
import { EventResponseDto } from '../dtos/responses';
import { CreateEventRequestDto, UpdateEventRequestDto } from '../dtos/requests';
import { AccessEventGuard } from '../guards';
import { CreateEventUseCase } from '../use-cases';
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
import { CommandBus } from '@nestjs/cqrs';

@Controller('events')
@ApiTags('Events')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class EventController {
  constructor(
    private eventService: EventService,
    private commandBus: CommandBus,
  ) {}

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
  async findEventById(@Param('eventId') eventId: string): Promise<Event> {
    return this.eventService.findEventById(eventId);
  }

  @Post()
  @ApiResponse({ type: EventResponseDto })
  async createEvent(@CurrentUser() user: AuthUser, @Body() dto: CreateEventRequestDto): Promise<Event> {
    return this.commandBus.execute(new CreateEventUseCase(dto, user));
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
