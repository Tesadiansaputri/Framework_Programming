import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { CustomerAddressesService } from './customer_addresses.service.js';

@Controller('customer-addresses')
export class CustomerAddressesController {
  constructor(
    private readonly customerAddressesService: CustomerAddressesService,
  ) {}

  @Get()
  findAll() {
    return this.customerAddressesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerAddressesService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.customerAddressesService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.customerAddressesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerAddressesService.remove(id);
  }
}