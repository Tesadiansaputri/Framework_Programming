import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CustomerAddress } from './entities/customer_addresses.entity.js';
import { Customer } from '../customers/entities/customers.entity.js';

@Injectable()
export class CustomerAddressesService {
  constructor(
    @InjectRepository(CustomerAddress)
    private readonly addressRepository: Repository<CustomerAddress>,

    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  // GET semua alamat customer
  findAll() {
    return this.addressRepository.find({
      relations: {
        customer: true,
      },
      order: {
        created_at: 'DESC',
      },
    });
  }

  // GET alamat berdasarkan ID
  async findOne(id: string) {
    const address = await this.addressRepository.findOne({
      where: { id },
      relations: {
        customer: true,
      },
    });

    if (!address) {
      throw new NotFoundException('Alamat customer tidak ditemukan');
    }

    return address;
  }

  // POST tambah alamat customer
  async create(data: Partial<CustomerAddress>) {
    const customer = await this.customerRepository.findOne({
      where: {
        id: data.customer_id,
      },
    });

    if (!customer) {
      throw new NotFoundException('Customer tidak ditemukan');
    }

    const address = this.addressRepository.create({
      ...data,
      customer,
    });

    return this.addressRepository.save(address);
  }

  // PUT update alamat customer
  async update(id: string, data: Partial<CustomerAddress>) {
  const address = await this.findOne(id);

  const { customer_id, ...addressData } = data;

  if (customer_id) {
    const customer = await this.customerRepository.findOne({
      where: { id: customer_id },
    });

    if (!customer) {
      throw new NotFoundException('Customer tidak ditemukan');
    }

    address.customer = customer;
  }

  Object.assign(address, addressData);

  return this.addressRepository.save(address);
}

  // DELETE alamat customer
  async remove(id: string) {
    const address = await this.findOne(id);

    await this.addressRepository.remove(address);

    return {
      message: 'Alamat customer berhasil dihapus',
    };
  }
}