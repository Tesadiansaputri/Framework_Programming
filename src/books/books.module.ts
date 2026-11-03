import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Book } from './entities/book-entity.js';
import { Author } from '../author/entities/author.entity.js';
import { Publisher } from '../publishers/entities/publishers.entity.js';
import { OrderItem } from '../orders_items/entities/orders_items.entity.js';

import { BooksService } from './books.service.js';
import { BooksController } from './books.controller.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Book,
      Author,
      Publisher,
      OrderItem,
    ]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}