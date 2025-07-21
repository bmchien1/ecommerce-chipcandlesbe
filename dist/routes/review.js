"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ReviewService_1 = require("../services/ReviewService");
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    const { page, limit, search } = req.query;
    if (page && limit) {
        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 10;
        const skip = (pageNum - 1) * limitNum;
        const [reviews, total] = await ReviewService_1.ReviewService.getAllPaginated(skip, limitNum, { search: search });
        return res.json({ data: {
                reviews,
                pagination: {
                    page: pageNum,
                    limit: limitNum,
                    total,
                    totalPages: Math.ceil(total / limitNum)
                }
            } });
    }
    else {
        const reviews = await ReviewService_1.ReviewService.getAll();
        res.json({ data: { reviews } });
    }
});
router.get("/:id", async (req, res) => {
    const review = await ReviewService_1.ReviewService.getById(Number(req.params.id));
    if (!review)
        return res.status(404).json({ message: "Not found" });
    res.json({ data: { review } });
});
router.post("/", async (req, res) => {
    const review = await ReviewService_1.ReviewService.create(req.body);
    res.status(201).json({ data: { review } });
});
router.put("/:id", async (req, res) => {
    const review = await ReviewService_1.ReviewService.update(Number(req.params.id), req.body);
    res.json({ data: { review } });
});
router.delete("/:id", async (req, res) => {
    await ReviewService_1.ReviewService.delete(Number(req.params.id));
    res.json({ message: "Deleted" });
});
exports.default = router;
