"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = require("../entities/Color");
const data_source_1 = require("../data-source");
class ColorService {
    constructor() {
        this.colorRepository = data_source_1.AppDataSource.getRepository(Color_1.Color);
    }
    static getInstance() {
        if (!ColorService.instance) {
            ColorService.instance = new ColorService();
        }
        return ColorService.instance;
    }
    async createColor(body) {
        const color = this.colorRepository.create({
            name: body.name,
            description: body.description,
            material: body.material,
            img_url: body.img_url,
            categoryId: body.categoryId,
        });
        return this.colorRepository.save(color);
    }
    async getAllColorsPaginated(skip, take, options) {
        const queryBuilder = this.colorRepository.createQueryBuilder("color");
        if (options?.search) {
            queryBuilder.where("(color.name ILIKE :search OR color.description ILIKE :search)", { search: `%${options.search}%` });
        }
        return queryBuilder
            .skip(skip)
            .take(take)
            .getManyAndCount();
    }
    async getColorById(id) {
        const color = await this.colorRepository.findOne({ where: { id } });
        if (!color) {
            throw new Error("Color not found");
        }
        return color;
    }
    async updateColor(id, body) {
        const color = await this.getColorById(id);
        if (body.name)
            color.name = body.name;
        if (body.description)
            color.description = body.description;
        if (body.material)
            color.material = body.material;
        if (body.img_url)
            color.img_url = body.img_url;
        if (body.categoryId)
            color.categoryId = body.categoryId;
        return this.colorRepository.save(color);
    }
    async deleteColor(id) {
        const color = await this.getColorById(id);
        await this.colorRepository.remove(color);
        return { message: "Color deleted successfully" };
    }
}
exports.default = ColorService;
