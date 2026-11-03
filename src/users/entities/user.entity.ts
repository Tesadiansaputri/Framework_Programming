import {
  IsNotEmpty,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

@Entity({ name: 'Users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @IsNotEmpty({ message: 'Nama wajib diisi' })
  @MaxLength(100)
  nama: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  @IsNotEmpty({ message: 'Email wajib diisi' })
  @IsEmail({}, { message: 'Format email tidak valid' })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  @Matches(/^[0-9]{10,15}$/, {
    message: 'Nomor HP harus 10-15 digit',
  })
  iphone: string;

  @Column({ type: 'text' })
  @IsNotEmpty({ message: 'Alamat wajib diisi' })
  @MaxLength(500)
  alamat: string;

  @Column({ type: 'varchar', length: 255, select: false })
  @MinLength(8, { message: 'Password minimal 8 karakter' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message: 'Password harus mengandung huruf besar, kecil, dan angka',
  })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}