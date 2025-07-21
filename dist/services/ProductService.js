"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = require("../entities/Product");
const data_source_1 = require("../data-source");
class ProductService {
    constructor() {
        this.productRepository = data_source_1.AppDataSource.getRepository(Product_1.Product);
    }
    static getInstance() {
        if (!ProductService.instance) {
            ProductService.instance = new ProductService();
        }
        return ProductService.instance;
    }
    async createProduct(body) {
        const product = this.productRepository.create({
            name: body.name,
            description: body.description,
            img_url: body.img_url,
            cost: body.cost,
            status: body.status,
        });
        return this.productRepository.save(product);
    }
    async getAllProductsPaginated(skip, take, options) {
        const queryBuilder = this.productRepository.createQueryBuilder("product");
        if (options?.search) {
            queryBuilder.where("(product.name ILIKE :search OR product.description ILIKE :search)", { search: `%${options.search}%` });
        }
        return queryBuilder.skip(skip).take(take).getManyAndCount();
    }
    async getProductById(id) {
        const product = await this.productRepository.findOne({ where: { id }, });
        if (!product)
            throw new Error("Product not found");
        return product;
    }
    async updateProduct(id, body) {
        const product = await this.getProductById(id);
        if (body.name)
            product.name = body.name;
        if (body.description)
            product.description = body.description;
        if (body.img_url)
            product.img_url = body.img_url;
        if (body.cost)
            product.cost = body.cost;
        if (typeof body.status === 'boolean')
            product.status = body.status;
        return this.productRepository.save(product);
    }
    async deleteProduct(id) {
        const product = await this.getProductById(id);
        await this.productRepository.remove(product);
        return { message: "Product deleted successfully" };
    }
}
exports.default = ProductService;
