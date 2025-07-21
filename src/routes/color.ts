import { Router } from "express";
import ColorService from "../services/ColorService";

const router = Router();
const colorService = ColorService.getInstance();

router.post("/", async (req, res, next) => {
  try {
    const color = await colorService.createColor(req.body);
    res.status(201).json({ data: color });
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

    const [colors, total] = await colorService.getAllColorsPaginated(skip, limit, { search });
    res.json({ data: {
      colors,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }});
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const color = await colorService.getColorById(parseInt(req.params.id));
    res.json({ data: { color } });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const color = await colorService.updateColor(parseInt(req.params.id), req.body);
    res.json({ data: { color } });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const result = await colorService.deleteColor(parseInt(req.params.id));
    res.json({ data: { result } });
  } catch (err) {
    next(err);
  }
});

export default router; 