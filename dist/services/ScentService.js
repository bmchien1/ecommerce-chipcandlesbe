"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Scent_1 = require("../entities/Scent");
const data_source_1 = require("../data-source");
class ScentService {
    constructor() {
        this.scentRepository = data_source_1.AppDataSource.getRepository(Scent_1.Scent);
    }
    static getInstance() {
        if (!ScentService.instance) {
            ScentService.instance = new ScentService();
        }
        return ScentService.instance;
    }
    async createScent(body) {
        const scent = this.scentRepository.create({
            name: body.name,
            description: body.description,
            material: body.material,
            intensity: body.intensity,
            capacity: body.capacity,
            img_url: body.img_url,
            categoryId: body.categoryId,
        });
        return this.scentRepository.save(scent);
    }
    async getAllScentsPaginated(skip, take, options) {
        const queryBuilder = this.scentRepository.createQueryBuilder("scent");
        if (options?.search) {
            queryBuilder.where("(scent.name ILIKE :search OR scent.description ILIKE :search)", { search: `%${options.search}%` });
        }
        return queryBuilder
            .skip(skip)
            .take(take)
            .getManyAndCount();
    }
    async getScentById(id) {
        const scent = await this.scentRepository.findOne({ where: { id } });
        if (!scent) {
            throw new Error("Scent not found");
        }
        return scent;
    }
    async updateScent(id, body) {
        const scent = await this.getScentById(id);
        if (body.name)
            scent.name = body.name;
        if (body.description)
            scent.description = body.description;
        if (body.material)
            scent.material = body.material;
        if (body.intensity)
            scent.intensity = body.intensity;
        if (body.capacity)
            scent.capacity = body.capacity;
        if (body.img_url)
            scent.img_url = body.img_url;
        if (body.categoryId)
            scent.categoryId = body.categoryId;
        return this.scentRepository.save(scent);
    }
    async deleteScent(id) {
        const scent = await this.getScentById(id);
        await this.scentRepository.remove(scent);
        return { message: "Scent deleted successfully" };
    }
}
exports.default = ScentService;
