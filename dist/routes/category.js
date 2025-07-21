"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CategoryService_1 = __importDefault(require("../services/CategoryService"));
const router = (0, express_1.Router)();
const categoryService = CategoryService_1.default.getInstance();
router.post("/", async (req, res, next) => {
    try {
        const category = await categoryService.createCategory(req.body);
        res.status(201).json({ data: category });
    }
    catch (err) {
        next(err);
    }
});
router.get("/", async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const entityType = req.query.entityType ? parseInt(req.query.entityType) : undefined;
        const [categories, total] = await categoryService.getAllCategoriesPaginated(skip, limit, { entityType });
        res.json({
            data: {
                categories,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit)
                }
            }
        });
    }
    catch (err) {
        next(err);
    }
});
router.get("/:id", async (req, res, next) => {
    try {
        const category = await categoryService.getCategoryById(parseInt(req.params.id));
        res.json({ data: { category } });
    }
    catch (err) {
        next(err);
    }
});
router.put("/:id", async (req, res, next) => {
    try {
        const category = await categoryService.updateCategory(parseInt(req.params.id), req.body);
        res.json({ data: { category } });
    }
    catch (err) {
        next(err);
    }
});
router.delete("/:id", async (req, res, next) => {
    try {
        const result = await categoryService.deleteCategory(parseInt(req.params.id));
        res.json({ data: { result } });
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
