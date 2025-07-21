"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = require("../entities/Category");
const data_source_1 = require("../data-source");
class CategoryService {
    constructor() {
        this.categoryRepository = data_source_1.AppDataSource.getRepository(Category_1.Category);
    }
    static getInstance() {
        if (!CategoryService.instance) {
            CategoryService.instance = new CategoryService();
        }
        return CategoryService.instance;
    }
    async createCategory(body) {
        const category = this.categoryRepository.create({
            name: body.name,
            entityType: body.entityType,
        });
        return this.categoryRepository.save(category);
    }
    async getAllCategories() {
        return this.categoryRepository.find();
    }
    async getAllCategoriesPaginated(skip, take, options) {
        const queryBuilder = this.categoryRepository.createQueryBuilder("category");
        if (options?.entityType) {
            queryBuilder.where("category.entityType = :entityType", { entityType: options.entityType });
        }
        return queryBuilder.skip(skip).take(take).getManyAndCount();
    }
    async getCategoryById(id) {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) {
            throw new Error("Category not found");
        }
        return category;
    }
    async updateCategory(id, body) {
        const category = await this.getCategoryById(id);
        if (body.name)
            category.name = body.name;
        if (body.entityType)
            category.entityType = body.entityType;
        return this.categoryRepository.save(category);
    }
    async deleteCategory(id) {
        const category = await this.getCategoryById(id);
        await this.categoryRepository.remove(category);
        return { message: "Category deleted successfully" };
    }
}
exports.default = CategoryService;
