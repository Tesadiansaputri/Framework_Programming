import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Author, BookAuthor } from './entities/book_authors.entity.js';
import { BookAuthorsService } from './book_authors.service.js';
import { BookAuthorsController } from './book_authors.controller.js';
import { Book } from '../books/entities/book-entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([BookAuthor, Book, Author])],
  controllers: [BookAuthorsController],
  providers: [BookAuthorsService],
  exports: [TypeOrmModule],
})
export class BookAuthorsModule {}