"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const data_source_1 = require("../data-source");
const Review_1 = require("../entities/Review");
class ReviewService {
    static async getAll() {
        return this.repo.find();
    }
    static async getAllPaginated(skip, take, options) {
        const queryBuilder = this.repo.createQueryBuilder("review");
        if (options?.search) {
            queryBuilder.where("(review.name ILIKE :search OR review.comment ILIKE :search)", { search: `%${options.search}%` });
        }
        return queryBuilder.skip(skip).take(take).getManyAndCount();
    }
    static async getById(id) {
        return this.repo.findOneBy({ id });
    }
    static async create(data) {
        const review = this.repo.create(data);
        return this.repo.save(review);
    }
    static async update(id, data) {
        await this.repo.update(id, data);
        return this.getById(id);
    }
    static async delete(id) {
        return this.repo.delete(id);
    }
}
exports.ReviewService = ReviewService;
ReviewService.repo = data_source_1.AppDataSource.getRepository(Review_1.Review);
