import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';

import { Order } from './entities/orders.entity.js';
import { Customer } from '../customers/entities/customers.entity.js';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  // GET semua orders
  async findAll() {
    return this.orderRepository.find({
      relations: {
        customer: true,
        orderItems: true,
        payment: true,
        shipment: true,
      },
      order: {
        created_at: 'DESC',
      },
    });
  }

  // GET order berdasarkan ID
  async findOne(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: {
        customer: true,
        orderItems: true,
        payment: true,
        shipment: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order tidak ditemukan');
    }

    return order;
  }

  // POST membuat order
  async create(data: Partial<Order>) {
    const customer = await this.customerRepository.findOne({
      where: { id: data.customer_id },
    });

    if (!customer) {
      throw new NotFoundException('Customer tidak ditemukan');
    }

    const existing = await this.orderRepository.findOne({
      where: { order_number: data.order_number },
    });

    if (existing) {
      throw new ConflictException('Nomor order sudah digunakan');
    }

    const order = this.orderRepository.create({
      customer_id: data.customer_id,
      customer,
      order_number: data.order_number,
      status: data.status ?? 'pending',
      total_amount: Number(data.total_amount ?? 0),
    });

    return this.orderRepository.save(order);
  }

  // PUT update order
  async update(id: string, data: Partial<Order>) {
    const order = await this.findOne(id);

    if (data.customer_id) {
      const customer = await this.customerRepository.findOne({
        where: { id: data.customer_id },
      });

      if (!customer) {
        throw new NotFoundException('Customer tidak ditemukan');
      }

      order.customer = customer;
      order.customer_id = data.customer_id;
    }

    if (data.order_number && data.order_number !== order.order_number) {
      const existing = await this.orderRepository.findOne({
        where: {
          order_number: data.order_number,
          id: Not(id),
        },
      });

      if (existing) {
        throw new ConflictException('Nomor order sudah digunakan');
      }

      order.order_number = data.order_number;
    }

    if (data.status !== undefined) {
      order.status = data.status;
    }

    if (data.total_amount !== undefined) {
      order.total_amount = Number(data.total_amount);
    }

    return this.orderRepository.save(order);
  }

  // DELETE order
  async remove(id: string) {
    const order = await this.findOne(id);

    await this.orderRepository.remove(order);

    return { message: 'Order berhasil dihapus' };
  }
}