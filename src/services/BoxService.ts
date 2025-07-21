import { Repository } from "typeorm";
import { Box } from "../entities/Box";
import { AppDataSource } from "../data-source";

interface BoxData {
  name: string;
  description: string;
  material: string,
  size: string,
  capacity: string,
  cost: string,
  img_url: string,
  categoryId: number;
}

interface BoxQueryOptions {
  search?: string;
}

class BoxService {
  private readonly boxRepository: Repository<Box>;
  private static instance: BoxService;

  constructor() {
    this.boxRepository = AppDataSource.getRepository(Box);
  }

  public static getInstance(): BoxService {
    if (!BoxService.instance) {
      BoxService.instance = new BoxService();
    }
    return BoxService.instance;
  }

  async createBox(body: BoxData): Promise<Box> {
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

  async getAllBoxsPaginated(skip: number, take: number, options?: BoxQueryOptions): Promise<[Box[], number]> {
    const queryBuilder = this.boxRepository.createQueryBuilder("box")

    if (options?.search) {
      queryBuilder.where(
        "(box.name ILIKE :search OR box.description ILIKE :search)",
        { search: `%${options.search}%` }
      );
    }

    return queryBuilder
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }

  async getBoxById(id: number): Promise<Box> {
    const box = await this.boxRepository.findOne({
      where: { id },
    });

    if (!box) {
      throw new Error("Box not found");
    }

    return box;
  }

  async updateBox(id: number, body: Partial<BoxData>): Promise<Box> {
    const box = await this.getBoxById(id);

    if (body.name) box.name = body.name;
    if (body.description) box.description = body.description;
    if (body.material) box.material = body.material;
    if (body.size) box.size = body.size;
    if (body.cost) box.cost = body.cost;
    if (body.capacity) box.capacity = body.capacity;
    if (body.img_url) box.img_url = body.img_url;
    if (body.categoryId) box.categoryId = body.categoryId;

    return this.boxRepository.save(box);
  }

  async deleteBox(id: number): Promise<{ message: string }> {
    const box = await this.getBoxById(id);
    await this.boxRepository.remove(box);
    return { message: "Box deleted successfully" };
  }

}

export default BoxService;//