import { Router } from "express";
import ScentService from "../services/ScentService";

const router = Router();
const scentService = ScentService.getInstance();

router.post("/", async (req, res, next) => {
  try {
    const scent = await scentService.createScent(req.body);
    res.status(201).json({ data: scent });
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search as string;

    const [scents, total] = await scentService.getAllScentsPaginated(skip, limit, { search });
    res.json({ data: { scents, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } } });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const scent = await scentService.getScentById(parseInt(req.params.id));
    res.json({ data: { scent } });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const scent = await scentService.updateScent(parseInt(req.params.id), req.body);
    res.json({ data: { scent } });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const result = await scentService.deleteScent(parseInt(req.params.id));
    res.json({ data: { result } });
  } catch (err) {
    next(err);
  }
});

export default router; 