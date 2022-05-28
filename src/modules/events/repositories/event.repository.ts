import { EntityRepository, Repository } from 'typeorm';
import { Event } from '../models/event.model';

@EntityRepository(Event)
export class EventRepository extends Repository<Event> {}
