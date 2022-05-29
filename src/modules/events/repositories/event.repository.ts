import { Event } from '../models';
import { BaseRepository } from '@/modules/core';
import { EntityRepository } from 'typeorm';

@EntityRepository(Event)
export class EventRepository extends BaseRepository<Event> {}
