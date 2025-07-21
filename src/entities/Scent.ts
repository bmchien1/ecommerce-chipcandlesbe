import { Entity, Column, ManyToOne, ManyToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Scent extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  material!: string;

  @Column()
  intensity!: string;

  @Column()
  capacity!: string;

  @Column()
  img_url!: string;

  @Column()
  categoryId!: number;
}