import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Review extends BaseEntity {

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ type: "text" })
  comment!: string;

  @Column({ type: "int", default: 5 })
  star!: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  img_url!: string;
} 