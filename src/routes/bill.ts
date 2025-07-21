import { Router } from "express";
import BillService from "../services/BillService";

const router = Router();
const billService = BillService.getInstance();

// Tạo mới bill
router.post("/", async (req, res, next) => {
  try {
    const bill = await billService.createBill(req.body);
    res.status(201).json({ data: bill });
  } catch (err) {
    next(err);
  }
});

// Lấy tất cả bill
router.get("/", async (req, res, next) => {
  try {
    const bills = await billService.getAllBills();
    res.json({ data: bills });
  } catch (err) {
    next(err);
  }
});

// Lấy 1 bill theo id
router.get("/:id", async (req, res, next) => {
  try {
    const bill = await billService.getBillById(parseInt(req.params.id));
    if (!bill) return res.status(404).json({ message: "Not found" });
    res.json({ data: bill });
  } catch (err) {
    next(err);
  }
});

// Cập nhật bill
router.put("/:id", async (req, res, next) => {
  try {
    const bill = await billService.updateBill(parseInt(req.params.id), req.body);
    if (!bill) return res.status(404).json({ message: "Not found" });
    res.json({ data: bill });
  } catch (err) {
    next(err);
  }
});

// Xoá bill
router.delete("/:id", async (req, res, next) => {
  try {
    const success = await billService.deleteBill(parseInt(req.params.id));
    if (!success) return res.status(404).json({ message: "Not found" });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router; 