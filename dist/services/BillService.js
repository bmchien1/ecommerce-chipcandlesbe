"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bill_1 = require("../entities/Bill");
const data_source_1 = require("../data-source");
const sendMail_1 = require("../utils/sendMail");
class BillService {
    constructor() {
        this.billRepository = data_source_1.AppDataSource.getRepository(Bill_1.Bill);
    }
    static getInstance() {
        if (!BillService.instance) {
            BillService.instance = new BillService();
        }
        return BillService.instance;
    }
    async createBill(data) {
        const bill = this.billRepository.create(data);
        const savedBill = await this.billRepository.save(bill);
        // Gửi email, không chặn response nếu lỗi gửi mail
        (0, sendMail_1.sendBillEmail)(savedBill).catch(console.error);
        return savedBill;
    }
    async getAllBills() {
        return this.billRepository.find();
    }
    async getBillById(id) {
        return this.billRepository.findOne({ where: { id } });
    }
    async updateBill(id, data) {
        const bill = await this.getBillById(id);
        if (!bill)
            return null;
        Object.assign(bill, data);
        return this.billRepository.save(bill);
    }
    async deleteBill(id) {
        const bill = await this.getBillById(id);
        if (!bill)
            return false;
        await this.billRepository.remove(bill);
        return true;
    }
}
exports.default = BillService;
