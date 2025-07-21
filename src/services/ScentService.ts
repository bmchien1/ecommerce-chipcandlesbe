import { Repository } from "typeorm";
import { Scent } from "../entities/Scent";
import { AppDataSource } from "../data-source";

interface ScentData {
  name: string;
  description: string;
  material: string;
  intensity: string;
  capacity: string;
  img_url: string;
  categoryId: number;
}

interface ScentQueryOptions {
  search?: string;
}

class ScentService {
  private readonly scentRepository: Repository<Scent>;
  private static instance: ScentService;

  constructor() {
    this.scentRepository = AppDataSource.getRepository(Scent);
  }

  public static getInstance(): ScentService {
    if (!ScentService.instance) {
      ScentService.instance = new ScentService();
    }
    return ScentService.instance;
  }

  async createScent(body: ScentData): Promise<Scent> {
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

  async getAllScentsPaginated(skip: number, take: number, options?: ScentQueryOptions): Promise<[Scent[], number]> {
    const queryBuilder = this.scentRepository.createQueryBuilder("scent");
    if (options?.search) {
      queryBuilder.where(
        "(scent.name ILIKE :search OR scent.description ILIKE :search)",
        { search: `%${options.search}%` }
      );
    }
    return queryBuilder
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }

  async getScentById(id: number): Promise<Scent> {
    const scent = await this.scentRepository.findOne({ where: { id } });
    if (!scent) {
      throw new Error("Scent not found");
    }
    return scent;
  }

  async updateScent(id: number, body: Partial<ScentData>): Promise<Scent> {
    const scent = await this.getScentById(id);
    if (body.name) scent.name = body.name;
    if (body.description) scent.description = body.description;
    if (body.material) scent.material = body.material;
    if (body.intensity) scent.intensity = body.intensity;
    if (body.capacity) scent.capacity = body.capacity;
    if (body.img_url) scent.img_url = body.img_url;
    if (body.categoryId) scent.categoryId = body.categoryId;
    return this.scentRepository.save(scent);
  }

  async deleteScent(id: number): Promise<{ message: string }> {
    const scent = await this.getScentById(id);
    await this.scentRepository.remove(scent);
    return { message: "Scent deleted successfully" };
  }
}

export default ScentService; 