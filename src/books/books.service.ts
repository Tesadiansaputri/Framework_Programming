
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';

import { Book } from './entities/book-entity.js';
import { Author } from '../author/entities/author.entity.js';
import { BookAuthor } from '../book_authors/entities/book_authors.entity.js';
import { CreateBookDto } from './dto/create-book.dto.js';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,

    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.booksRepository.find({
      where: { deletedAt: IsNull() },
      relations: {
        category: true,
        publisher: true,
        bookAuthors: {
          author: true,
        },
      },
      order: { createdAt: 'DESC' },
    });
  }

  async create(dto: CreateBookDto): Promise<Book> {
    // Mencari author berdasarkan ID
    const author = await this.authorsRepository.findOneBy({
      id: dto.author,
    });

    if (!author) {
      throw new NotFoundException(
        `Author with ID ${dto.author} not found`,
      );
    }

    // Membuat data buku
    const newBook = this.booksRepository.create({
      title: dto.title,
      isbn: dto.isbn,
      publishedYear: dto.publishedYear,
    });

    // Menyimpan buku
    const savedBook = await this.booksRepository.save(newBook);

    // Membuat relasi buku dengan author
    const bookAuthor = this.booksRepository.manager.create(
      BookAuthor,
      {
        book: savedBook,
        author: author,
      },
    );

    // Menyimpan relasi ke tabel book_authors
    await this.booksRepository.manager.save(bookAuthor);

    // Mengembalikan buku beserta relasinya
    return this.findById(savedBook.id);
  }

  async findById(id: string): Promise<Book> {
    const book = await this.booksRepository.findOne({
      where: { id },
      relations: {
        category: true,
        publisher: true,
        bookAuthors: {
          author: true,
        },
      },
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  async update(id: string, dto: CreateBookDto): Promise<Book> {
    const book = await this.findById(id);

    book.title = dto.title;
    book.isbn = dto.isbn;
    book.publishedYear = dto.publishedYear;

    if (dto.author) {
      const author = await this.authorsRepository.findOneBy({
        id: dto.author,
      });

      if (!author) {
        throw new NotFoundException(
          `Author with ID ${dto.author} not found`,
        );
      }

      // Mencari relasi buku dan author
      const existingRelation = await this.booksRepository.manager.findOne(
        BookAuthor,
        {
          where: {
            book_id: id,
          },
        },
      );

      if (existingRelation) {
        existingRelation.author = author;
        existingRelation.author_id = author.id;

        await this.booksRepository.manager.save(existingRelation);
      } else {
        const newRelation = this.booksRepository.manager.create(
          BookAuthor,
          {
            book,
            author,
          },
        );

        await this.booksRepository.manager.save(newRelation);
      }
    }

    await this.booksRepository.save(book);

    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    const book = await this.findById(id);
    await this.booksRepository.softRemove(book);
  }
}
