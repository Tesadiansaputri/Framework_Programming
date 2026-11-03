import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { OrdersItemsService } from './orders_items.service.js';

@Controller('orders-items')
export class OrdersItemsController {
  constructor(
    private readonly ordersItemsService: OrdersItemsService,
  ) {}

  @Get()
  findAll() {
    return this.ordersItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersItemsService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.ordersItemsService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.ordersItemsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersItemsService.remove(id);
  }
}