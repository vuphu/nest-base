import { Event } from '../models';
import { BaseRepository } from '@/modules/core';
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class EventRepository extends BaseRepository<Event> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Event, dataSource.createEntityManager());
  }
}
