/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('menus')
export class Menu {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, nullable: true })
  url?: string;

  // 👈 Kolom foreign key parent_id secara eksplisit
  @Column({ name: 'parent_id', type: 'bigint', nullable: true })
  parentId: number | null;

  // 👈 Relasi ManyToOne dengan self-join
  @ManyToOne(() => Menu, (menu) => menu.children, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parent_id' })
  parent: Menu;

  // 👈 Relasi OneToMany untuk mendapatkan anak-anak
  @OneToMany(() => Menu, (menu) => menu.parent)
  children: Menu[];

  @Column({ name: 'order_no', type: 'int', default: 0 })
  orderNo: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;
}