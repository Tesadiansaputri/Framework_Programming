import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';

import { Shipment } from './entities/shipment.entity.js';
import { Order } from '../orders/entities/orders.entity.js';

@Injectable()
export class ShipmentsService {
  constructor(
    @InjectRepository(Shipment)
    private readonly shipmentRepository: Repository<Shipment>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  // GET semua pengiriman
  async findAll() {
    return this.shipmentRepository.find({
      relations: { order: true },
    });
  }

  // GET pengiriman berdasarkan ID
  async findOne(id: string) {
    const shipment = await this.shipmentRepository.findOne({
      where: { id },
      relations: { order: true },
    });

    if (!shipment) {
      throw new NotFoundException('Pengiriman tidak ditemukan');
    }

    return shipment;
  }

  // POST membuat pengiriman
  async create(data: any) {
    const order = await this.orderRepository.findOne({
      where: { id: data.order_id },
    });

    if (!order) {
      throw new NotFoundException('Order tidak ditemukan');
    }

    const existingShipment = await this.shipmentRepository.findOne({
      where: { order_id: data.order_id },
    });

    if (existingShipment) {
      throw new ConflictException(
        'Order ini sudah memiliki data pengiriman',
      );
    }

    const shipment = this.shipmentRepository.create({
      order_id: data.order_id,
      courier: data.courier,
      tracking_number: data.tracking_number ?? null,
      status: data.status,
      ...(data.shipped_at
        ? { shipped_at: new Date(data.shipped_at) }
        : {}),
      ...(data.delivered_at
        ? { delivered_at: new Date(data.delivered_at) }
        : {}),
    });

    return this.shipmentRepository.save(shipment);
  }

  // PUT mengubah pengiriman
  async update(id: string, data: any) {
    const shipment = await this.findOne(id);

    if (data.order_id && data.order_id !== shipment.order_id) {
      const order = await this.orderRepository.findOne({
        where: { id: data.order_id },
      });

      if (!order) {
        throw new NotFoundException('Order tidak ditemukan');
      }

      const existingShipment = await this.shipmentRepository.findOne({
        where: {
          order_id: data.order_id,
          id: Not(shipment.id),
        },
      });

      if (existingShipment) {
        throw new ConflictException(
          'Order ini sudah memiliki data pengiriman',
        );
      }

      shipment.order_id = data.order_id;
    }

    if (data.courier !== undefined) {
      shipment.courier = data.courier;
    }

    if (data.tracking_number !== undefined) {
      shipment.tracking_number = data.tracking_number;
    }

    if (data.status !== undefined) {
      shipment.status = data.status;
    }

    if (data.shipped_at !== undefined) {
      shipment.shipped_at = data.shipped_at
        ? new Date(data.shipped_at)
        : null;
    }

    if (data.delivered_at !== undefined) {
      shipment.delivered_at = data.delivered_at
        ? new Date(data.delivered_at)
        : null;
    }

    return this.shipmentRepository.save(shipment);
  }

  // DELETE menghapus pengiriman
  async remove(id: string) {
    const shipment = await this.findOne(id);

    await this.shipmentRepository.remove(shipment);

    return {
      message: 'Data pengiriman berhasil dihapus',
    };
  }
}