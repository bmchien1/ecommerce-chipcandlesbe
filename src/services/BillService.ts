import { Repository } from "typeorm";
import { Bill } from "../entities/Bill";
import { AppDataSource } from "../data-source";
import { sendBillEmail } from '../utils/sendMail';

interface BillData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  notes?: string;
  orderItems: any[];
  paymentMethod: string;
  isPaid?: boolean;
}

class BillService {
  private readonly billRepository: Repository<Bill>;
  private static instance: BillService;

  constructor() {
    this.billRepository = AppDataSource.getRepository(Bill);
  }

  public static getInstance(): BillService {
    if (!BillService.instance) {
      BillService.instance = new BillService();
    }
    return BillService.instance;
  }

  async createBill(data: BillData): Promise<Bill> {
    const bill = this.billRepository.create(data);
    const savedBill = await this.billRepository.save(bill);
    // Gửi email, không chặn response nếu lỗi gửi mail
    sendBillEmail(savedBill).catch(console.error);
    return savedBill;
  }

  async getAllBills(): Promise<Bill[]> {
    return this.billRepository.find();
  }

  async getBillById(id: number): Promise<Bill | null> {
    return this.billRepository.findOne({ where: { id } });
  }

  async updateBill(id: number, data: Partial<BillData>): Promise<Bill | null> {
    const bill = await this.getBillById(id);
    if (!bill) return null;
    Object.assign(bill, data);
    return this.billRepository.save(bill);
  }

  async deleteBill(id: number): Promise<boolean> {
    const bill = await this.getBillById(id);
    if (!bill) return false;
    await this.billRepository.remove(bill);
    return true;
  }
}

export default BillService; 