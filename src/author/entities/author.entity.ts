import {
  IsNotEmpty,
  IsString,
  IsUrl,
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

import { BookAuthor } from '../../book_authors/entities/book_authors.entity.js';

@Entity({ name: 'authors' })
export class Author {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @IsNotEmpty({ message: 'Nama pengarang wajib diisi' })
  @IsString()
  @MaxLength(100)
  nama: string;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty({ message: 'Foto wajib diisi' })
  @IsUrl({}, { message: 'Format URL foto tidak valid' })
  foto: string;

  @Column({ type: 'text' })
  @IsNotEmpty({ message: 'Alamat wajib diisi' })
  @IsString()
  alamat: string;

  @OneToMany(() => BookAuthor, (bookAuthor) => bookAuthor.author)
  bookAuthors: BookAuthor[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}