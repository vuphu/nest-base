import { BaseRepository } from 'src/modules/core/repositories/base.repository';
import { EntityRepository } from 'typeorm';
import { Event } from '../models/event.model';

@EntityRepository(Event)
export class EventRepository extends BaseRepository<Event> {}
