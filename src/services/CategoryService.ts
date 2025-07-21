import { Repository } from "typeorm";
import { Category } from "../entities/Category";
import { AppDataSource } from "../data-source";

interface CategoryData {
  name: string;
  entityType: number;
}

interface CategoryQueryOptions {
  entityType?: number;
}

class CategoryService {
  private readonly categoryRepository: Repository<Category>;
  private static instance: CategoryService;

  constructor() {
    this.categoryRepository = AppDataSource.getRepository(Category);
  }

  public static getInstance(): CategoryService {
    if (!CategoryService.instance) {
      CategoryService.instance = new CategoryService();
    }
    return CategoryService.instance;
  }

  async createCategory(body: CategoryData): Promise<Category> {
    const category = this.categoryRepository.create({
      name: body.name,
      entityType: body.entityType,
    });
    return this.categoryRepository.save(category);
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async getAllCategoriesPaginated(skip: number, take: number, options?: CategoryQueryOptions): Promise<[Category[], number]> {
    const queryBuilder = this.categoryRepository.createQueryBuilder("category");
    if (options?.entityType) {
      queryBuilder.where("category.entityType = :entityType", { entityType: options.entityType });
    }
    return queryBuilder.skip(skip).take(take).getManyAndCount();
  }

  async getCategoryById(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  }

  async updateCategory(id: number, body: Partial<CategoryData>): Promise<Category> {
    const category = await this.getCategoryById(id);
    if (body.name) category.name = body.name;
    if (body.entityType) category.entityType = body.entityType;
    return this.categoryRepository.save(category);
  }

  async deleteCategory(id: number): Promise<{ message: string }> {
    const category = await this.getCategoryById(id);
    await this.categoryRepository.remove(category);
    return { message: "Category deleted successfully" };
  }
}

export default CategoryService; 