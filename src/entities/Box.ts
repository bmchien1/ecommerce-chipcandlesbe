import { Entity, Column, ManyToOne, ManyToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Box extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  material!: string;

  @Column()
  size!: string;

  @Column()
  capacity!: string;

  @Column()
  cost!: string;

  @Column()
  img_url!: string;

  @Column()
  categoryId!: number;

}