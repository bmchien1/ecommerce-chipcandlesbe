import { Router } from "express";
import { ReviewService } from "../services/ReviewService";

const router = Router();

router.get("/", async (req, res) => {
  const { page, limit, search } = req.query;
  if (page && limit) {
    const pageNum = parseInt(page as string) || 1;
    const limitNum = parseInt(limit as string) || 10;
    const skip = (pageNum - 1) * limitNum;
    const [reviews, total] = await ReviewService.getAllPaginated(skip, limitNum, { search: search as string });
    return res.json({data:{
      reviews,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      }
    }});
  } else {
    const reviews = await ReviewService.getAll();
    res.json({data:{ reviews }});
  }
});

router.get("/:id", async (req, res) => {
  const review = await ReviewService.getById(Number(req.params.id));
  if (!review) return res.status(404).json({ message: "Not found" });
  res.json({data:{ review }});
});

router.post("/", async (req, res) => {
  const review = await ReviewService.create(req.body);
  res.status(201).json({data:{review}});
});

router.put("/:id", async (req, res) => {
  const review = await ReviewService.update(Number(req.params.id), req.body);
  res.json({data:{ review }});
});

router.delete("/:id", async (req, res) => {
  await ReviewService.delete(Number(req.params.id));
  res.json({ message: "Deleted" });
});

export default router; 