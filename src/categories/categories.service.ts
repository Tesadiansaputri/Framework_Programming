import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity.js';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // GET semua kategori
  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  // GET kategori berdasarkan ID
  async findOne(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Kategori tidak ditemukan');
    }

    return category;
  }

  // POST tambah kategori
  async create(data: Partial<Category>) {
    const existingCategory = await this.categoryRepository.findOne({
      where: { name: data.name },
    });

    if (existingCategory) {
      throw new ConflictException('Nama kategori sudah terdaftar');
    }

    const category = this.categoryRepository.create(data);
    return this.categoryRepository.save(category);
  }

  // PUT update kategori
  async update(id: string, data: Partial<Category>) {
    const category = await this.findOne(id);

    if (data.name && data.name !== category.name) {
      const existingCategory = await this.categoryRepository.findOne({
        where: { name: data.name },
      });

      if (existingCategory) {
        throw new ConflictException('Nama kategori sudah digunakan');
      }
    }

    Object.assign(category, data);

    return this.categoryRepository.save(category);
  }

  // DELETE kategori
  async remove(id: string) {
    const category = await this.findOne(id);

    await this.categoryRepository.remove(category);

    return {
      message: 'Kategori berhasil dihapus',
    };
  }
}