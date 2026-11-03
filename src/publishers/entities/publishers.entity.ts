import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import type { Relation } from 'typeorm';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { Book } from '../../books/entities/book-entity.js';

@Entity({ name: 'publishers' })
export class Publisher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  name: string;

  @OneToMany(() => Book, (book) => book.publisher)
  books: Relation<Book[]>;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}