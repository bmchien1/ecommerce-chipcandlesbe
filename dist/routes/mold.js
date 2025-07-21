"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MoldService_1 = __importDefault(require("../services/MoldService"));
const router = (0, express_1.Router)();
const moldService = MoldService_1.default.getInstance();
router.post("/", async (req, res, next) => {
    try {
        const mold = await moldService.createMold(req.body);
        res.status(201).json({ data: mold });
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
        const [molds, total] = await moldService.getAllMoldsPaginated(skip, limit, { search });
        res.json({
            data: {
                molds,
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
        const mold = await moldService.getMoldById(parseInt(req.params.id));
        res.json({ data: { mold } });
    }
    catch (err) {
        next(err);
    }
});
router.put("/:id", async (req, res, next) => {
    try {
        const mold = await moldService.updateMold(parseInt(req.params.id), req.body);
        res.json({ data: { mold } });
    }
    catch (err) {
        next(err);
    }
});
router.delete("/:id", async (req, res, next) => {
    try {
        const result = await moldService.deleteMold(parseInt(req.params.id));
        res.json({ data: { result } });
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
