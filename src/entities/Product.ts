import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Product extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  img_url!: string;

  @Column()
  cost!: string;

  @Column({ default: true })
  status!: boolean; // true: còn, false: hết
} 