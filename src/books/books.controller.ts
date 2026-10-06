import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { BooksService } from './books.service.js';
import { CreateBookDto } from './dto/create-book.dto.js';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    //menampilkan semua data buku
    @Get()
    getBooks() {
        return this.booksService.findAll();
    }

    //menambahkan data buku baru
    @Post()
    createBook(@Body() createBookDto: CreateBookDto) {
        return this.booksService.create(createBookDto);
    }

    //menampilkan data buku berdasarkan ID
    @Get(':id')
    getBookById(@Param('id') id: string) {
        return `Specific book details for ID: ${id}`;
    }

    //memperbarui buku berdasarkan ID
    @Put(':id')
    updateBook(@Param('id') id: string) {
        return `Book with ID: ${id} has been updated`;
    }

    //menghapus buku berdasarkan ID
    @Delete(':id')
    deleteBook(@Param('id') id: string) {
        return `Book with ID: ${id} has been deleted`;
    }
}