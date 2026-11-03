import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  Min,
  MaxLength,
} from 'class-validator';

import * as typeorm from 'typeorm';
import { Order } from '../../orders/entities/orders.entity.js';

@Entity({ name: 'payments' })
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'order_id', unique: true })
  order_id: string;

  @OneToOne(() => Order, (order) => order.payment)
  @JoinColumn({ name: 'order_id' })
  order: typeorm.Relation<Order>;

  @Column({ type: 'varchar', length: 50 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  payment_method: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  @IsNumber()
  @Min(0)
  amount: number;

  @Column({ type: 'varchar', length: 30 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  status: string;

  @Column({ type: 'timestamp', nullable: true })
@IsOptional()
paid_at: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}