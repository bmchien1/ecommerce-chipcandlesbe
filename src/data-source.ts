import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Box } from "./entities/Box";
import { Card } from "./entities/Card";
import { Color } from "./entities/Color";
import { Mold } from "./entities/Mold";
import { Scent } from "./entities/Scent";
import { Category } from "./entities/Category";
import { Product } from "./entities/Product";
import { Bill } from "./entities/Bill";
import { Review } from "./entities/Review";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  synchronize: process.env.NODE_ENV !== "production",
  logging: process.env.NODE_ENV === "development",
  entities: [
    Box,
    Card,
    Color,
    Mold,
    Scent,
    Category,
    Product,
    Bill,
    Review,
  ],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});

export async function initializeDatabase() {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully to Neon Postgres");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
}