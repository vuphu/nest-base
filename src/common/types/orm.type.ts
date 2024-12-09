import { FindOptionsOrderValue } from 'typeorm';

export type PaginateOptions = {
  page: number;
  limit: number;
};

export type SortOptions = {
  sortField: string;
  sortOrder: FindOptionsOrderValue;
};

export type PaginateCollection<T> = {
  totalCount: number;
  page: number;
  limit: number;
  items: T[];
};
