import { CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Column } from "typeorm";

@Entity({name: 'Books'})
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar', length:100})
  title: string;

  @Column({type: 'varchar', length:50})
  author: string;

  @Column({ type: 'varchar', length: 20 })
  isbn: string;

  @Column({type: 'int', default:0})
  publishedYear: number;

   @Column({type: 'boolean', default:true})
  isAvailable: boolean;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

  @DeleteDateColumn({name :'deleted_at', default: null})
  deletedAt: Date;


}