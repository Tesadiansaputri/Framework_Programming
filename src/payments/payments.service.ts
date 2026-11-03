import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';

import { Payment } from './entities/payment.entity.js';
import { Order } from '../orders/entities/orders.entity.js';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  // GET semua pembayaran
  async findAll() {
    return this.paymentRepository.find({
      relations: {
        order: true,
      },
      order: {
        created_at: 'DESC',
      },
    });
  }

  // GET pembayaran berdasarkan ID
  async findOne(id: string) {
    const payment = await this.paymentRepository.findOne({
      where: { id },
      relations: {
        order: true,
      },
    });

    if (!payment) {
      throw new NotFoundException(
        'Pembayaran tidak ditemukan',
      );
    }

    return payment;
  }

  // POST membuat pembayaran
  async create(data: any) {
    // Cek order
    const order = await this.orderRepository.findOne({
      where: {
        id: data.order_id,
      },
    });

    if (!order) {
      throw new NotFoundException(
        'Order tidak ditemukan',
      );
    }

    // Cek pembayaran yang sudah ada
    const existingPayment = await this.paymentRepository.findOne({
      where: {
        order_id: data.order_id,
      },
    });

    if (existingPayment) {
      throw new ConflictException(
        'Order ini sudah memiliki pembayaran',
      );
    }

    // Validasi amount
    const amount = Number(data.amount);

    if (!Number.isFinite(amount) || amount < 0) {
      throw new BadRequestException(
        'Amount tidak valid',
      );
    }

    // Membuat data pembayaran
    const payment = this.paymentRepository.create({
      order_id: data.order_id,
      payment_method: data.payment_method,
      amount,
      status: data.status,
      ...(data.paid_at
        ? { paid_at: new Date(data.paid_at) }
        : {}),
    });

    return this.paymentRepository.save(payment);
  }

  // PUT mengubah pembayaran
  async update(id: string, data: any) {
    const payment = await this.findOne(id);

    // Update order
    if (
      data.order_id &&
      data.order_id !== payment.order_id
    ) {
      const order = await this.orderRepository.findOne({
        where: {
          id: data.order_id,
        },
      });

      if (!order) {
        throw new NotFoundException(
          'Order tidak ditemukan',
        );
      }

      // Cek pembayaran ganda
      const existingPayment = await this.paymentRepository.findOne({
        where: {
          order_id: data.order_id,
          id: Not(payment.id),
        },
      });

      if (existingPayment) {
        throw new ConflictException(
          'Order ini sudah memiliki pembayaran',
        );
      }

      payment.order_id = data.order_id;
    }

    // Update metode pembayaran
    if (data.payment_method !== undefined) {
      payment.payment_method = data.payment_method;
    }

    // Update jumlah pembayaran
    if (data.amount !== undefined) {
      const amount = Number(data.amount);

      if (!Number.isFinite(amount) || amount < 0) {
        throw new BadRequestException(
          'Amount tidak valid',
        );
      }

      payment.amount = amount;
    }

    // Update status
    if (data.status !== undefined) {
      payment.status = data.status;
    }

    // Update tanggal pembayaran
    if (data.paid_at !== undefined) {
      payment.paid_at = data.paid_at
        ? new Date(data.paid_at)
        : null;
    }

    return this.paymentRepository.save(payment);
  }

  // DELETE menghapus pembayaran
  async remove(id: string) {
    const payment = await this.findOne(id);

    await this.paymentRepository.remove(payment);

    return {
      message: 'Pembayaran berhasil dihapus',
    };
  }
}