import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { BookAuthorsService } from './book_authors.service.js';

@Controller('book-authors')
export class BookAuthorsController {
  constructor(
    private readonly bookAuthorsService: BookAuthorsService,
  ) {}

  @Get()
  findAll() {
    return this.bookAuthorsService.findAll();
  }

  @Get(':book_id/:author_id')
  findOne(
    @Param('book_id') book_id: string,
    @Param('author_id') author_id: string,
  ) {
    return this.bookAuthorsService.findOne(book_id, author_id);
  }

  @Post()
  create(@Body() data: { book_id: string; author_id: string }) {
    return this.bookAuthorsService.create(data);
  }

  @Delete(':book_id/:author_id')
  remove(
    @Param('book_id') book_id: string,
    @Param('author_id') author_id: string,
  ) {
    return this.bookAuthorsService.remove(book_id, author_id);
  }
}