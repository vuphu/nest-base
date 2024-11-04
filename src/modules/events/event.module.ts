import { EventController } from './controllers';
import { EventRepository } from './repositories';
import { EventService } from './services';
import { Event } from './models';
import { CreateEventHandler } from './use-cases';
import { EventCreatedHandler } from './cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Event])],
  providers: [EventRepository, EventService, CreateEventHandler, EventCreatedHandler],
  controllers: [EventController],
})
export class EventModule {}
