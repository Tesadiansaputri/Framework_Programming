import * as typeorm from 'typeorm';

import { Book } from '../../books/entities/book-entity.js';
import { Author } from '../../author/entities/author.entity.js';

@typeorm.Entity({ name: 'book_authors' })
export class BookAuthor {
  @typeorm.PrimaryColumn('uuid', { name: 'book_id' })
  book_id: string;

  @typeorm.PrimaryColumn('uuid', { name: 'author_id' })
  author_id: string;

  @typeorm.ManyToOne(() => Book, (book) => book.bookAuthors)
  @typeorm.JoinColumn({ name: 'book_id' })
  book: typeorm.Relation<Book>;

  @typeorm.ManyToOne(() => Author, (author) => author.bookAuthors)
  @typeorm.JoinColumn({ name: 'author_id' })
  author: typeorm.Relation<Author>;
}

export { Author };
