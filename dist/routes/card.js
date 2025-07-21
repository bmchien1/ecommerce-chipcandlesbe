"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CardService_1 = __importDefault(require("../services/CardService"));
const router = (0, express_1.Router)();
const cardService = CardService_1.default.getInstance();
router.post("/", async (req, res, next) => {
    try {
        const card = await cardService.createCard(req.body);
        res.status(201).json({ data: card });
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
        const [cards, total] = await cardService.getAllCardsPaginated(skip, limit, { search });
        res.json({
            data: {
                cards,
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
        const card = await cardService.getCardById(parseInt(req.params.id));
        res.json({ data: { card } });
    }
    catch (err) {
        next(err);
    }
});
router.put("/:id", async (req, res, next) => {
    try {
        const card = await cardService.updateCard(parseInt(req.params.id), req.body);
        res.json({ data: { card } });
    }
    catch (err) {
        next(err);
    }
});
router.delete("/:id", async (req, res, next) => {
    try {
        const result = await cardService.deleteCard(parseInt(req.params.id));
        res.json({ data: { result } });
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
