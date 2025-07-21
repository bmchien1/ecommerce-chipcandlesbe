import { Entity, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Category extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  entityType!: number; // 1: Box, 2: Card, 3: Color, 4: Mold, 5: Scent
} 