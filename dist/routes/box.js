"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BoxService_1 = __importDefault(require("../services/BoxService"));
const router = (0, express_1.Router)();
const boxService = BoxService_1.default.getInstance();
// Protected routes requiring authentication
router.post("/", async (req, res, next) => {
    try {
        const box = await boxService.createBox(req.body);
        res.status(201).json({ data: box });
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
        const [boxes, total] = await boxService.getAllBoxsPaginated(skip, limit, {
            search,
        });
        res.json({ data: { boxes, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } } });
    }
    catch (err) {
        next(err);
    }
});
router.get("/:id", async (req, res, next) => {
    try {
        const box = await boxService.getBoxById(parseInt(req.params.id));
        res.json({ data: { box } });
    }
    catch (err) {
        next(err);
    }
});
router.put("/:id", async (req, res, next) => {
    try {
        const box = await boxService.updateBox(parseInt(req.params.id), req.body);
        res.json({ data: { box } });
    }
    catch (err) {
        next(err);
    }
});
router.delete("/:id", async (req, res, next) => {
    try {
        const result = await boxService.deleteBox(parseInt(req.params.id));
        res.json({ data: { result } });
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
