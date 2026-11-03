import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerAddressesController } from './customer_addresses.controller.js';
import { CustomerAddressesService } from './customer_addresses.service.js';
import { CustomerAddress } from './entities/customer_addresses.entity.js';
import { Customer } from '../customers/entities/customers.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerAddress, Customer]),
  ],
  controllers: [CustomerAddressesController],
  providers: [CustomerAddressesService],
  exports: [TypeOrmModule],
})
export class CustomerAddressesModule {}