"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = require("../entities/Card");
const data_source_1 = require("../data-source");
class CardService {
    constructor() {
        this.cardRepository = data_source_1.AppDataSource.getRepository(Card_1.Card);
    }
    static getInstance() {
        if (!CardService.instance) {
            CardService.instance = new CardService();
        }
        return CardService.instance;
    }
    async createCard(body) {
        const card = this.cardRepository.create({
            name: body.name,
            description: body.description,
            material: body.material,
            size: body.size,
            design: body.design,
            cost: body.cost,
            img_url: body.img_url,
            categoryId: body.categoryId,
        });
        return this.cardRepository.save(card);
    }
    async getAllCardsPaginated(skip, take, options) {
        const queryBuilder = this.cardRepository.createQueryBuilder("card");
        if (options?.search) {
            queryBuilder.where("(card.name ILIKE :search OR card.description ILIKE :search)", { search: `%${options.search}%` });
        }
        return queryBuilder
            .skip(skip)
            .take(take)
            .getManyAndCount();
    }
    async getCardById(id) {
        const card = await this.cardRepository.findOne({ where: { id } });
        if (!card) {
            throw new Error("Card not found");
        }
        return card;
    }
    async updateCard(id, body) {
        const card = await this.getCardById(id);
        if (body.name)
            card.name = body.name;
        if (body.description)
            card.description = body.description;
        if (body.material)
            card.material = body.material;
        if (body.size)
            card.size = body.size;
        if (body.design)
            card.design = body.design;
        if (body.cost)
            card.cost = body.cost;
        if (body.img_url)
            card.img_url = body.img_url;
        if (body.categoryId)
            card.categoryId = body.categoryId;
        return this.cardRepository.save(card);
    }
    async deleteCard(id) {
        const card = await this.getCardById(id);
        await this.cardRepository.remove(card);
        return { message: "Card deleted successfully" };
    }
}
exports.default = CardService;
