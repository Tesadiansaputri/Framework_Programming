import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publisher } from './entities/publishers.entity.js';

@Injectable()
export class PublishersService {
  constructor(
    @InjectRepository(Publisher)
    private readonly publisherRepository: Repository<Publisher>,
  ) {}

  // GET semua publisher
  async findAll(): Promise<Publisher[]> {
    return this.publisherRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  // GET publisher berdasarkan ID
  async findOne(id: string): Promise<Publisher> {
    const publisher = await this.publisherRepository.findOne({
      where: { id },
    });

    if (!publisher) {
      throw new NotFoundException('Penerbit tidak ditemukan');
    }

    return publisher;
  }

  // POST tambah publisher
  async create(data: Partial<Publisher>) {
    const publisher = this.publisherRepository.create(data);
    return this.publisherRepository.save(publisher);
  }

  // PUT update publisher
  async update(id: string, data: Partial<Publisher>) {
    const publisher = await this.findOne(id);

    Object.assign(publisher, data);

    return this.publisherRepository.save(publisher);
  }

  // DELETE publisher
  async remove(id: string) {
    const publisher = await this.findOne(id);

    await this.publisherRepository.remove(publisher);

    return {
      message: 'Publisher berhasil dihapus',
    };
  }
}