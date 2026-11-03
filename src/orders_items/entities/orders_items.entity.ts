import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import * as typeorm from 'typeorm';
import type { Relation } from 'typeorm';
import { IsInt, IsNumber, Min } from 'class-validator';
import { Order } from '../../orders/entities/orders.entity.js';
import { Book } from '../../books/entities/book-entity.js';

@Entity({ name: 'order_items' })
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'order_id' })
  order_id: string;

  @ManyToOne(() => Order, (order) => order.orderItems)
@JoinColumn({ name: 'order_id' })
order: typeorm.Relation<Order>;

  @Column({ type: 'uuid', name: 'book_id' })
  book_id: string;

  @ManyToOne(() => Book, (book) => book.orderItems)
@JoinColumn({ name: 'book_id' })
book: typeorm.Relation<Book>;

  @Column({ type: 'int' })
  @IsInt()
  @Min(1)
  quantity: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  @IsNumber()
  @Min(0)
  price: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  @IsNumber()
  @Min(0)
  subtotal: number;

  
}