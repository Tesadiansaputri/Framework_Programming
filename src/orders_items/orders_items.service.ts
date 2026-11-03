import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderItem } from './entities/orders_items.entity.js';
import { Order } from '../orders/entities/orders.entity.js';
import { Book } from '../books/entities/book-entity.js';

@Injectable()
export class OrdersItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async findAll() {
    return this.orderItemRepository.find({
      relations: { order: true, book: true },
    });
  }

  async findOne(id: string) {
    const item = await this.orderItemRepository.findOne({
      where: { id },
      relations: { order: true, book: true },
    });

    if (!item) {
      throw new NotFoundException('Detail pesanan tidak ditemukan');
    }

    return item;
  }

  async create(data: any) {
    const order = await this.orderRepository.findOne({
      where: { id: data.order_id },
    });

    if (!order) {
      throw new NotFoundException('Order tidak ditemukan');
    }

    const book = await this.bookRepository.findOne({
      where: { id: data.book_id },
    });

    if (!book) {
      throw new NotFoundException('Book tidak ditemukan');
    }

    const quantity = Number(data.quantity);
    const price = Number(data.price);

    if (!Number.isInteger(quantity) || quantity < 1 || price < 0) {
      throw new BadRequestException('Quantity atau price tidak valid');
    }

    const subtotal = quantity * price;

    const item = this.orderItemRepository.create({
      order_id: data.order_id,
      book_id: data.book_id,
      quantity,
      price,
      subtotal,
    });

    return this.orderItemRepository.save(item);
  }

  async update(id: string, data: any) {
    const item = await this.findOne(id);

    if (data.order_id) {
      const order = await this.orderRepository.findOne({
        where: { id: data.order_id },
      });
      if (!order) throw new NotFoundException('Order tidak ditemukan');
      item.order_id = data.order_id;
    }

    if (data.book_id) {
      const book = await this.bookRepository.findOne({
        where: { id: data.book_id },
      });
      if (!book) throw new NotFoundException('Book tidak ditemukan');
      item.book_id = data.book_id;
    }

    const quantity = data.quantity !== undefined
      ? Number(data.quantity)
      : item.quantity;

    const price = data.price !== undefined
      ? Number(data.price)
      : Number(item.price);

    if (!Number.isInteger(quantity) || quantity < 1 || price < 0) {
      throw new BadRequestException('Quantity atau price tidak valid');
    }

    item.quantity = quantity;
    item.price = price;
    item.subtotal = quantity * price;

    return this.orderItemRepository.save(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    await this.orderItemRepository.remove(item);

    return { message: 'Detail pesanan berhasil dihapus' };
  }
}