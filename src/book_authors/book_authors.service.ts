import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BookAuthor } from './entities/book_authors.entity.js';
import { Book } from '../books/entities/book-entity.js';
import { Author } from '../author/entities/author.entity.js';

@Injectable()
export class BookAuthorsService {
  constructor(
    @InjectRepository(BookAuthor)
    private readonly bookAuthorRepository: Repository<BookAuthor>,

    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  // GET semua relasi buku dan penulis
  async findAll() {
    return this.bookAuthorRepository.find({
      relations: {
        book: true,
        author: true,
      },
    });
  }

  // GET berdasarkan ID buku dan ID penulis
  async findOne(book_id: string, author_id: string) {
    const relation = await this.bookAuthorRepository.findOne({
      where: { book_id, author_id },
      relations: {
        book: true,
        author: true,
      },
    });

    if (!relation) {
      throw new NotFoundException('Relasi buku dan author tidak ditemukan');
    }

    return relation;
  }

  // POST menambahkan relasi buku dan penulis
  async create(data: { book_id: string; author_id: string }) {
    const book = await this.bookRepository.findOne({
      where: { id: data.book_id },
    });

    if (!book) {
      throw new NotFoundException('Buku tidak ditemukan');
    }

    const author = await this.authorRepository.findOne({
      where: { id: data.author_id },
    });

    if (!author) {
      throw new NotFoundException('Author tidak ditemukan');
    }

    const existing = await this.bookAuthorRepository.findOne({
      where: {
        book_id: data.book_id,
        author_id: data.author_id,
      },
    });

    if (existing) {
      throw new ConflictException('Relasi buku dan author sudah ada');
    }

    const relation = this.bookAuthorRepository.create({
      book_id: data.book_id,
      author_id: data.author_id,
      book,
      author,
    });

    return this.bookAuthorRepository.save(relation);
  }

  // DELETE menghapus relasi buku dan penulis
  async remove(book_id: string, author_id: string) {
    const relation = await this.findOne(book_id, author_id);

    await this.bookAuthorRepository.remove(relation);

    return { message: 'Relasi buku dan author berhasil dihapus' };
  }
}