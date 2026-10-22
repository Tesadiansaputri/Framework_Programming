
import { Injectable } from '@nestjs/common';
import { Book } from './entities/book-entity.js';
import { CreateBookDto } from './dto/create-book.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private readonly booksRepository: Repository<Book>
    ) {}

    // Mencari semua data buku
    async findAll(): Promise<Book[]> {
        return this.booksRepository.find({
            order: { createdAt: 'DESC' }
        });
    }

    // Menyimpan data buku
    async create(book: CreateBookDto): Promise<Book> {
        const newBook = this.booksRepository.create(book);
        return this.booksRepository.save(newBook);
    }
}
