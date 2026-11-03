import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, Not } from 'typeorm';
import { Customer } from './entities/customers.entity.js';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  // GET semua customer
  findAll() {
    return this.customerRepository.find({
      where: { deleted_at: IsNull() },
      order: { created_at: 'DESC' },
    });
  }

  // GET customer berdasarkan ID
  async findOne(id: string) {
    const customer = await this.customerRepository.findOne({
      where: { id, deleted_at: IsNull() },
    });

    if (!customer) {
      throw new NotFoundException('Customer tidak ditemukan');
    }

    return customer;
  }

  // POST customer baru
  async create(data: Partial<Customer>) {
    const existingCustomer = await this.customerRepository.findOne({
      where: { email: data.email },
    });

    if (existingCustomer) {
      throw new ConflictException('Email sudah terdaftar');
    }

    const customer = this.customerRepository.create(data);

    return this.customerRepository.save(customer);
  }

  // PUT update customer
  async update(id: string, data: Partial<Customer>) {
    const customer = await this.findOne(id);

    if (data.email && data.email !== customer.email) {
      const existingCustomer = await this.customerRepository.findOne({
        where: {
          email: data.email,
          id: Not(id),
        },
      });

      if (existingCustomer) {
        throw new ConflictException('Email sudah digunakan customer lain');
      }
    }

    Object.assign(customer, data);

    return this.customerRepository.save(customer);
  }

  // DELETE customer (soft delete)
  async remove(id: string) {
    const customer = await this.findOne(id);

    await this.customerRepository.softRemove(customer);

    return {
      message: 'Customer berhasil dihapus',
    };
  }
}