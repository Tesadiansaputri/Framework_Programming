import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorController } from './author.controller.js';
import { AuthorService } from './author.service.js';
import { Author } from './entities/author.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  controllers: [AuthorController],
  providers: [AuthorService],
  exports: [TypeOrmModule],
})
export class AuthorModule {}