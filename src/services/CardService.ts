import { Repository } from "typeorm";
import { Card } from "../entities/Card";
import { AppDataSource } from "../data-source";

interface CardData {
  name: string;
  description: string;
  material: string;
  size: string;
  design: string;
  cost: string;
  img_url: string;
  categoryId: number;
}

interface CardQueryOptions {
  search?: string;
}

class CardService {
  private readonly cardRepository: Repository<Card>;
  private static instance: CardService;

  constructor() {
    this.cardRepository = AppDataSource.getRepository(Card);
  }

  public static getInstance(): CardService {
    if (!CardService.instance) {
      CardService.instance = new CardService();
    }
    return CardService.instance;
  }

  async createCard(body: CardData): Promise<Card> {
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

  async getAllCardsPaginated(skip: number, take: number, options?: CardQueryOptions): Promise<[Card[], number]> {
    const queryBuilder = this.cardRepository.createQueryBuilder("card");
    if (options?.search) {
      queryBuilder.where(
        "(card.name ILIKE :search OR card.description ILIKE :search)",
        { search: `%${options.search}%` }
      );
    }
    return queryBuilder
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }

  async getCardById(id: number): Promise<Card> {
    const card = await this.cardRepository.findOne({ where: { id } });
    if (!card) {
      throw new Error("Card not found");
    }
    return card;
  }

  async updateCard(id: number, body: Partial<CardData>): Promise<Card> {
    const card = await this.getCardById(id);
    if (body.name) card.name = body.name;
    if (body.description) card.description = body.description;
    if (body.material) card.material = body.material;
    if (body.size) card.size = body.size;
    if (body.design) card.design = body.design;
    if (body.cost) card.cost = body.cost;
    if (body.img_url) card.img_url = body.img_url;
    if (body.categoryId) card.categoryId = body.categoryId;
    return this.cardRepository.save(card);
  }

  async deleteCard(id: number): Promise<{ message: string }> {
    const card = await this.getCardById(id);
    await this.cardRepository.remove(card);
    return { message: "Card deleted successfully" };
  }
}

export default CardService; 