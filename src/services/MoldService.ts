import { Repository } from "typeorm";
import { Mold } from "../entities/Mold";
import { AppDataSource } from "../data-source";

interface MoldData {
  name: string;
  description: string;
  material: string;
  size: string;
  capacity: string;
  cost: string;
  img_url: string;
  categoryId: number;
}

interface MoldQueryOptions {
  search?: string;
}

class MoldService {
  private readonly moldRepository: Repository<Mold>;
  private static instance: MoldService;

  constructor() {
    this.moldRepository = AppDataSource.getRepository(Mold);
  }

  public static getInstance(): MoldService {
    if (!MoldService.instance) {
      MoldService.instance = new MoldService();
    }
    return MoldService.instance;
  }

  async createMold(body: MoldData): Promise<Mold> {
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

  async getAllMoldsPaginated(skip: number, take: number, options?: MoldQueryOptions): Promise<[Mold[], number]> {
    const queryBuilder = this.moldRepository.createQueryBuilder("mold");
    if (options?.search) {
      queryBuilder.where(
        "(mold.name ILIKE :search OR mold.description ILIKE :search)",
        { search: `%${options.search}%` }
      );
    }
    return queryBuilder
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }

  async getMoldById(id: number): Promise<Mold> {
    const mold = await this.moldRepository.findOne({ where: { id } });
    if (!mold) {
      throw new Error("Mold not found");
    }
    return mold;
  }

  async updateMold(id: number, body: Partial<MoldData>): Promise<Mold> {
    const mold = await this.getMoldById(id);
    if (body.name) mold.name = body.name;
    if (body.description) mold.description = body.description;
    if (body.material) mold.material = body.material;
    if (body.size) mold.size = body.size;
    if (body.capacity) mold.capacity = body.capacity;
    if (body.cost) mold.cost = body.cost;
    if (body.img_url) mold.img_url = body.img_url;
    if (body.categoryId) mold.categoryId = body.categoryId;
    return this.moldRepository.save(mold);
  }

  async deleteMold(id: number): Promise<{ message: string }> {
    const mold = await this.getMoldById(id);
    await this.moldRepository.remove(mold);
    return { message: "Mold deleted successfully" };
  }
}

export default MoldService; 