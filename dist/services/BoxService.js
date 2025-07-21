"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Box_1 = require("../entities/Box");
const data_source_1 = require("../data-source");
class BoxService {
    constructor() {
        this.boxRepository = data_source_1.AppDataSource.getRepository(Box_1.Box);
    }
    static getInstance() {
        if (!BoxService.instance) {
            BoxService.instance = new BoxService();
        }
        return BoxService.instance;
    }
    async createBox(body) {
        const box = this.boxRepository.create({
            name: body.name,
            description: body.description,
            material: body.material,
            size: body.size,
            capacity: body.capacity,
            cost: body.cost,
            img_url: body.img_url,
            categoryId: body.categoryId,
        });
        return this.boxRepository.save(box);
    }
    async getAllBoxsPaginated(skip, take, options) {
        const queryBuilder = this.boxRepository.createQueryBuilder("box");
        if (options?.search) {
            queryBuilder.where("(box.name ILIKE :search OR box.description ILIKE :search)", { search: `%${options.search}%` });
        }
        return queryBuilder
            .skip(skip)
            .take(take)
            .getManyAndCount();
    }
    async getBoxById(id) {
        const box = await this.boxRepository.findOne({
            where: { id },
        });
        if (!box) {
            throw new Error("Box not found");
        }
        return box;
    }
    async updateBox(id, body) {
        const box = await this.getBoxById(id);
        if (body.name)
            box.name = body.name;
        if (body.description)
            box.description = body.description;
        if (body.material)
            box.material = body.material;
        if (body.size)
            box.size = body.size;
        if (body.cost)
            box.cost = body.cost;
        if (body.capacity)
            box.capacity = body.capacity;
        if (body.img_url)
            box.img_url = body.img_url;
        if (body.categoryId)
            box.categoryId = body.categoryId;
        return this.boxRepository.save(box);
    }
    async deleteBox(id) {
        const box = await this.getBoxById(id);
        await this.boxRepository.remove(box);
        return { message: "Box deleted successfully" };
    }
}
exports.default = BoxService; //
