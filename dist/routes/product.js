"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductService_1 = __importDefault(require("../services/ProductService"));
const router = (0, express_1.Router)();
const productService = ProductService_1.default.getInstance();
// Tạo mới sản phẩm
router.post("/", async (req, res, next) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json({ data: product });
    }
    catch (err) {
        next(err);
    }
});
// Lấy tất cả sản phẩm (có phân trang)
router.get("/", async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const search = req.query.search;
        const [products, total] = await productService.getAllProductsPaginated(skip, limit, { search });
        res.json({ data: { products, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } } });
    }
    catch (err) {
        next(err);
    }
});
// Lấy 1 sản phẩm theo id
router.get("/:id", async (req, res, next) => {
    try {
        const product = await productService.getProductById(parseInt(req.params.id));
        res.json({ data: { product } });
    }
    catch (err) {
        next(err);
    }
});
// Cập nhật sản phẩm
router.put("/:id", async (req, res, next) => {
    try {
        const product = await productService.updateProduct(parseInt(req.params.id), req.body);
        res.json({ data: { product } });
    }
    catch (err) {
        next(err);
    }
});
// Xoá sản phẩm
router.delete("/:id", async (req, res, next) => {
    try {
        const result = await productService.deleteProduct(parseInt(req.params.id));
        res.json({ data: { result } });
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
