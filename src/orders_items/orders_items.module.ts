import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderItem } from './entities/orders_items.entity.js';
import { Order } from '../orders/entities/orders.entity.js';
import { Book } from '../books/entities/book-entity.js';

import { OrdersItemsService } from './orders_items.service.js';
import { OrdersItemsController } from './orders_items.controller.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItem, Order, Book]),
  ],
  providers: [OrdersItemsService],
  controllers: [OrdersItemsController],
  exports: [OrdersItemsService],
})
export class OrdersItemsModule {}