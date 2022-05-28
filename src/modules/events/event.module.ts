import { Module } from '@nestjs/common';
import { EventService } from './services/event.service';
import { EventController } from './controllers/event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventRepository } from './repositories/event.repository';
import { Event } from './models/event.model';

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventRepository])],
  providers: [EventService],
  controllers: [EventController],
})
export class EventModule {}
