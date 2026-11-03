import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  MaxLength,
} from 'class-validator';

import * as typeorm from 'typeorm';
import { Order } from '../../orders/entities/orders.entity.js';

@Entity({ name: 'shipments' })
export class Shipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'order_id', unique: true })
  order_id: string;

  @OneToOne(() => Order, (order) => order.shipment)
  @JoinColumn({ name: 'order_id' })
  order: typeorm.Relation<Order>;

  @Column({ type: 'varchar', length: 100 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  courier: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @IsOptional()
  @IsString()
  tracking_number: string;

  @Column({ type: 'varchar', length: 30 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  status: string;

  @Column({ type: 'timestamp', nullable: true })
  @IsOptional()
  shipped_at: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  @IsOptional()
  delivered_at: Date | null;
}