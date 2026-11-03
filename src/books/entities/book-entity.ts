import * as typeorm from 'typeorm';

import { Category } from '../../categories/entities/category.entity.js';
import { Publisher } from '../../publishers/entities/publishers.entity.js';
import { BookAuthor } from '../../book_authors/entities/book_authors.entity.js';
import { OrderItem } from '../../orders_items/entities/orders_items.entity.js';

@typeorm.Entity({ name: 'Books' })
export class Book {
  @typeorm.PrimaryGeneratedColumn('uuid')
  id: string;

  @typeorm.Column({ type: 'varchar', length: 100 })
  title: string;

  @typeorm.Column({ type: 'varchar', length: 20 })
  isbn: string;

  @typeorm.Column({ type: 'int', default: 0 })
  publishedYear: number;

  @typeorm.Column({ type: 'boolean', default: true })
  isAvailable: boolean;

  @typeorm.ManyToOne(() => Category, (category) => category.books)
  @typeorm.JoinColumn({ name: 'category_id' })
  category: typeorm.Relation<Category>;

  @typeorm.ManyToOne(() => Publisher, (publisher) => publisher.books)
  @typeorm.JoinColumn({ name: 'publisher_id' })
  publisher: typeorm.Relation<Publisher>;

  @typeorm.OneToMany(() => BookAuthor, (bookAuthor) => bookAuthor.book)
  bookAuthors: typeorm.Relation<BookAuthor[]>;

  @typeorm.OneToMany(() => OrderItem, (item) => item.book)
  orderItems: typeorm.Relation<OrderItem[]>;

  @typeorm.CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @typeorm.UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @typeorm.DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}