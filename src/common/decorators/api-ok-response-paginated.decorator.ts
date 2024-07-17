import { PaginateCollectionDto } from '../dtos/responses';
import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ClassConstructor } from 'class-transformer';

export const ApiPaginationResponse = <T>(cls: ClassConstructor<T>): MethodDecorator =>
  applyDecorators(
    ApiExtraModels(PaginateCollectionDto, cls),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginateCollectionDto) },
          {
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(cls) },
              },
            },
          },
        ],
      },
    }),
  );
