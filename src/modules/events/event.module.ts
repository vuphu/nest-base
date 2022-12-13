import { EventController } from './controllers';
import { EventRepository } from './repositories';
import { EventService } from './services';
import { Event } from './models';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  providers: [EventRepository, EventService],
  controllers: [EventController],
})
export class EventModule {}
