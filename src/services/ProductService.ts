import { Repository } from "typeorm";
import { Product } from "../entities/Product";
import { AppDataSource } from "../data-source";

interface ProductData {
  name: string;
  description: string;
  img_url: string;
  cost:string;
  status: boolean;
}

interface ProductQueryOptions {
  search?: string;
}

class ProductService {
  private readonly productRepository: Repository<Product>;
  private static instance: ProductService;

  constructor() {
    this.productRepository = AppDataSource.getRepository(Product);
  }

  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  async createProduct(body: ProductData): Promise<Product> {
    const product = this.productRepository.create({
      name: body.name,
      description: body.description,
      img_url: body.img_url,
      cost: body.cost,
      status: body.status,
    });
    return this.productRepository.save(product);
  }

  async getAllProductsPaginated(skip: number, take: number, options?: ProductQueryOptions): Promise<[Product[], number]> {
    const queryBuilder = this.productRepository.createQueryBuilder("product");
    if (options?.search) {
      queryBuilder.where(
        "(product.name ILIKE :search OR product.description ILIKE :search)",
        { search: `%${options.search}%` }
      );
    }
    return queryBuilder.skip(skip).take(take).getManyAndCount();
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id }, });
    if (!product) throw new Error("Product not found");
    return product;
  }

  async updateProduct(id: number, body: Partial<ProductData>): Promise<Product> {
    const product = await this.getProductById(id);
    if (body.name) product.name = body.name;
    if (body.description) product.description = body.description;
    if (body.img_url) product.img_url = body.img_url;
    if (body.cost) product.cost = body.cost;
    if (typeof body.status === 'boolean') product.status = body.status;
    return this.productRepository.save(product);
  }

  async deleteProduct(id: number): Promise<{ message: string }> {
    const product = await this.getProductById(id);
    await this.productRepository.remove(product);
    return { message: "Product deleted successfully" };
  }
}

export default ProductService; 