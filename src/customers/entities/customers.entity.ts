import {
  IsNotEmpty,
  IsEmail,
  IsString,
  MaxLength,
} from 'class-validator';

import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';

import * as typeorm from 'typeorm';
import { Order } from '../../orders/entities/orders.entity.js';
import { CustomerAddress } from '../../customer_addresses/entities/customer_addresses.entity.js';

@Entity({ name: 'customers' })
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  @IsNotEmpty({ message: 'Nama pelanggan wajib diisi' })
  @MaxLength(150)
  name: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  @IsNotEmpty({ message: 'Email wajib diisi' })
  @IsEmail({}, { message: 'Format email tidak valid' })
  @MaxLength(150)
  email: string;

  @Column({ type: 'varchar', length: 20 })
  @IsNotEmpty({ message: 'Nomor telepon wajib diisi' })
  @IsString()
  @MaxLength(20)
  phone: string;

  @OneToMany(() => Order, (order) => order.customer)
  orders: typeorm.Relation<Order[]>;

  @OneToMany(() => CustomerAddress, (address) => address.customer)
  addresses: typeorm.Relation<CustomerAddress[]>;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at: Date;
}