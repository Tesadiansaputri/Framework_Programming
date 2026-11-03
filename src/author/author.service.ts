import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Author } from './entities/author.entity.js';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  // GET semua author
  async findAll() {
    return this.authorRepository.find({
      where: { deletedAt: IsNull() },
    });
  }

  // GET author berdasarkan ID
  async findOne(id: string) {
    const author = await this.authorRepository.findOne({
      where: { id, deletedAt: IsNull() },
    });

    if (!author) {
      throw new NotFoundException('Author tidak ditemukan');
    }

    return author;
  }

  // POST tambah author
  async create(data: Partial<Author>) {
    const author = this.authorRepository.create(data);

    return this.authorRepository.save(author);
  }

  // PUT update author
  async update(id: string, data: Partial<Author>) {
    const author = await this.findOne(id);

    Object.assign(author, data);

    return this.authorRepository.save(author);
  }

  // DELETE author (soft delete)
  async remove(id: string) {
    const author = await this.findOne(id);

    await this.authorRepository.softRemove(author);

    return {
      message: 'Author berhasil dihapus',
    };
  }
}