import { AppDataSource } from "../data-source";
import { Review } from "../entities/Review";
import { Repository } from "typeorm";

export class ReviewService {
  private static repo: Repository<Review> = AppDataSource.getRepository(Review);

  static async getAll() {
    return this.repo.find();
  }

  static async getAllPaginated(skip: number, take: number, options?: { search?: string }) {
    const queryBuilder = this.repo.createQueryBuilder("review");
    if (options?.search) {
      queryBuilder.where(
        "(review.name ILIKE :search OR review.comment ILIKE :search)",
        { search: `%${options.search}%` }
      );
    }
    return queryBuilder.skip(skip).take(take).getManyAndCount();
  }

  static async getById(id: number) {
    return this.repo.findOneBy({ id });
  }

  static async create(data: Partial<Review>) {
    const review = this.repo.create(data);
    return this.repo.save(review);
  }

  static async update(id: number, data: Partial<Review>) {
    await this.repo.update(id, data);
    return this.getById(id);
  }

  static async delete(id: number) {
    return this.repo.delete(id);
  }
} 