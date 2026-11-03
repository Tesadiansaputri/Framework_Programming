import {
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import * as typeorm from 'typeorm';
import { Customer } from '../../customers/entities/customers.entity.js';

@Entity({ name: 'customer_addresses' })
export class CustomerAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  customer_id: string;

  @ManyToOne(() => Customer, (customer) => customer.addresses)
  @JoinColumn({ name: 'customer_id' })
  customer: typeorm.Relation<Customer>;

  @Column({ type: 'varchar', length: 150 })
  @IsNotEmpty({ message: 'Nama penerima wajib diisi' })
  @MaxLength(150)
  recipient_name: string;

  @Column({ type: 'varchar', length: 20 })
  @IsNotEmpty({ message: 'Nomor telepon wajib diisi' })
  @MaxLength(20)
  phone: string;

  @Column({ type: 'text' })
  @IsNotEmpty({ message: 'Alamat wajib diisi' })
  @IsString()
  address: string;

  @Column({ type: 'varchar', length: 100 })
  @IsNotEmpty({ message: 'Kota wajib diisi' })
  @MaxLength(100)
  city: string;

  @Column({ type: 'varchar', length: 10 })
  @IsNotEmpty({ message: 'Kode pos wajib diisi' })
  @MaxLength(10)
  postal_code: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}