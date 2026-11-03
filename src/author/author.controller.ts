import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { AuthorService } from './author.service.js';

@Controller('author')
export class AuthorController {
  constructor(
    private readonly authorService: AuthorService,
  ) {}

  // GET semua author
  @Get()
  findAll() {
    return this.authorService.findAll();
  }

  // GET author berdasarkan ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorService.findOne(id);
  }

  // POST tambah author
  @Post()
  create(@Body() data: any) {
    return this.authorService.create(data);
  }

  // PUT update author
  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.authorService.update(id, data);
  }

  // DELETE author
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorService.remove(id);
  }
}