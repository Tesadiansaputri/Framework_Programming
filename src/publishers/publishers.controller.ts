import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { PublishersService } from './publishers.service.js';

@Controller('publishers')
export class PublishersController {
  constructor(
    private readonly publishersService: PublishersService,
  ) {}

  // GET semua publisher
  @Get()
  findAll() {
    return this.publishersService.findAll();
  }

  // GET publisher berdasarkan ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publishersService.findOne(id);
  }

  // POST tambah publisher
  @Post()
  create(@Body() data: any) {
    return this.publishersService.create(data);
  }

  // PUT update publisher
  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.publishersService.update(id, data);
  }

  // DELETE publisher
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publishersService.remove(id);
  }
}