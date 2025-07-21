"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mold_1 = require("../entities/Mold");
const data_source_1 = require("../data-source");
class MoldService {
    constructor() {
        this.moldRepository = data_source_1.AppDataSource.getRepository(Mold_1.Mold);
    }
    static getInstance() {
        if (!MoldService.instance) {
            MoldService.instance = new MoldService();
        }
        return MoldService.instance;
    }
    async createMold(body) {
        const mold = this.moldRepository.create({
            name: body.name,
            description: body.description,
            material: body.material,
            size: body.size,
            capacity: body.capacity,
            cost: body.cost,
            img_url: body.img_url,
            categoryId: body.categoryId,
        });
        return this.moldRepository.save(mold);
    }
    async getAllMoldsPaginated(skip, take, options) {
        const queryBuilder = this.moldRepository.createQueryBuilder("mold");
        if (options?.search) {
            queryBuilder.where("(mold.name ILIKE :search OR mold.description ILIKE :search)", { search: `%${options.search}%` });
        }
        return queryBuilder
            .skip(skip)
            .take(take)
            .getManyAndCount();
    }
    async getMoldById(id) {
        const mold = await this.moldRepository.findOne({ where: { id } });
        if (!mold) {
            throw new Error("Mold not found");
        }
        return mold;
    }
    async updateMold(id, body) {
        const mold = await this.getMoldById(id);
        if (body.name)
            mold.name = body.name;
        if (body.description)
            mold.description = body.description;
        if (body.material)
            mold.material = body.material;
        if (body.size)
            mold.size = body.size;
        if (body.capacity)
            mold.capacity = body.capacity;
        if (body.cost)
            mold.cost = body.cost;
        if (body.img_url)
            mold.img_url = body.img_url;
        if (body.categoryId)
            mold.categoryId = body.categoryId;
        return this.moldRepository.save(mold);
    }
    async deleteMold(id) {
        const mold = await this.getMoldById(id);
        await this.moldRepository.remove(mold);
        return { message: "Mold deleted successfully" };
    }
}
exports.default = MoldService;
