import { Repository } from "typeorm";
import { Color } from "../entities/Color";
import { AppDataSource } from "../data-source";

interface ColorData {
  name: string;
  description: string;
  material: string;
  img_url: string;
  categoryId: number;
}

interface ColorQueryOptions {
  search?: string;
}

class ColorService {
  private readonly colorRepository: Repository<Color>;
  private static instance: ColorService;

  constructor() {
    this.colorRepository = AppDataSource.getRepository(Color);
  }

  public static getInstance(): ColorService {
    if (!ColorService.instance) {
      ColorService.instance = new ColorService();
    }
    return ColorService.instance;
  }

  async createColor(body: ColorData): Promise<Color> {
    const color = this.colorRepository.create({
      name: body.name,
      description: body.description,
      material: body.material,
      img_url: body.img_url,
      categoryId: body.categoryId,
    });
    return this.colorRepository.save(color);
  }

  async getAllColorsPaginated(skip: number, take: number, options?: ColorQueryOptions): Promise<[Color[], number]> {
    const queryBuilder = this.colorRepository.createQueryBuilder("color");
    if (options?.search) {
      queryBuilder.where(
        "(color.name ILIKE :search OR color.description ILIKE :search)",
        { search: `%${options.search}%` }
      );
    }
    return queryBuilder
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }

  async getColorById(id: number): Promise<Color> {
    const color = await this.colorRepository.findOne({ where: { id } });
    if (!color) {
      throw new Error("Color not found");
    }
    return color;
  }

  async updateColor(id: number, body: Partial<ColorData>): Promise<Color> {
    const color = await this.getColorById(id);
    if (body.name) color.name = body.name;
    if (body.description) color.description = body.description;
    if (body.material) color.material = body.material;
    if (body.img_url) color.img_url = body.img_url;
    if (body.categoryId) color.categoryId = body.categoryId;
    return this.colorRepository.save(color);
  }

  async deleteColor(id: number): Promise<{ message: string }> {
    const color = await this.getColorById(id);
    await this.colorRepository.remove(color);
    return { message: "Color deleted successfully" };
  }
}

export default ColorService; 