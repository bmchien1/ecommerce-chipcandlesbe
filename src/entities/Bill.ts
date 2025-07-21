import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Bill extends BaseEntity {

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column()
  phone!: string;

  @Column()
  address!: string;

  @Column()
  city!: string;

  @Column()
  district!: string;

  @Column()
  ward!: string;

  @Column({ type: "text", nullable: true })
  notes?: string;

  @Column({ type: "json" })
  orderItems!: any[]; // Lưu mảng sản phẩm từ localStorage

  @Column()
  paymentMethod!: string;

  @Column({ default: false })
  isPaid!: boolean;
} 