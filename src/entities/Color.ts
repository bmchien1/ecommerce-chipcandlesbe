import { Entity, Column, ManyToOne, ManyToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Color extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  material!: string;

  @Column()
  img_url!: string;

  @Column()
  categoryId!: number;

}