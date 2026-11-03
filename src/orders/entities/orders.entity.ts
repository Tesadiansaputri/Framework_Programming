import {
  IsNotEmpty,
  IsIn,
  MaxLength,
  IsNumber,
  Min,
} from 'class-validator';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

import * as typeorm from 'typeorm';
import { Customer } from '../../customers/entities/customers.entity.js';
import { OrderItem } from '../../orders_items/entities/orders_items.entity.js';
import { Payment } from '../../payments/entities/payment.entity.js';
import { Shipment } from '../../shipments/entities/shipment.entity.js';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  customer_id: string;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({ name: 'customer_id' })
  customer: typeorm.Relation<Customer>;

  @Column({ type: 'varchar', length: 50, unique: true })
  @IsNotEmpty({ message: 'Nomor pesanan wajib diisi' })
  @MaxLength(50)
  order_number: string;

  @Column({ type: 'varchar', length: 30, default: 'pending' })
  @IsNotEmpty({ message: 'Status pesanan wajib diisi' })
  @IsIn(
    ['pending', 'paid', 'processing', 'shipped', 'completed', 'cancelled'],
    { message: 'Status pesanan tidak valid' },
  )
  status: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  @IsNumber()
  @Min(0, { message: 'Total pesanan tidak boleh negatif' })
  total_amount: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @OneToMany(() => OrderItem, (item) => item.order)
  orderItems: typeorm.Relation<OrderItem[]>;

  @OneToOne(() => Payment, (payment) => payment.order)
  payment: typeorm.Relation<Payment>;

  @OneToOne(() => Shipment, (shipment) => shipment.order)
  shipment: typeorm.Relation<Shipment>;
}