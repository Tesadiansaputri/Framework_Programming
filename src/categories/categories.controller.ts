import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

import { CategoriesService } from './categories.service.js';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
  ) {}

  // GET semua kategori
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  // GET kategori berdasarkan ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  // POST tambah kategori
  @Post()
  create(@Body() data: any) {
    return this.categoriesService.create(data);
  }

  // PUT update kategori
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: any,
  ) {
    return this.categoriesService.update(id, data);
  }

  // DELETE kategori
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}