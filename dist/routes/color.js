"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ColorService_1 = __importDefault(require("../services/ColorService"));
const router = (0, express_1.Router)();
const colorService = ColorService_1.default.getInstance();
router.post("/", async (req, res, next) => {
    try {
        const color = await colorService.createColor(req.body);
        res.status(201).json({ data: color });
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
        const search = req.query.search;
        const [colors, total] = await colorService.getAllColorsPaginated(skip, limit, { search });
        res.json({ data: {
                colors,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit)
                }
            } });
    }
    catch (err) {
        next(err);
    }
});
router.get("/:id", async (req, res, next) => {
    try {
        const color = await colorService.getColorById(parseInt(req.params.id));
        res.json({ data: { color } });
    }
    catch (err) {
        next(err);
    }
});
router.put("/:id", async (req, res, next) => {
    try {
        const color = await colorService.updateColor(parseInt(req.params.id), req.body);
        res.json({ data: { color } });
    }
    catch (err) {
        next(err);
    }
});
router.delete("/:id", async (req, res, next) => {
    try {
        const result = await colorService.deleteColor(parseInt(req.params.id));
        res.json({ data: { result } });
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
