"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const data_source_1 = require("./data-source");
const errorMiddleware_1 = __importDefault(require("./middleware/errorMiddleware"));
const responseMiddleware_1 = __importDefault(require("./middleware/responseMiddleware"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json()); // Parse JSON bodies
app.use((0, cors_1.default)({
    origin: '*', // Allow your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Support cookies/auth headers if needed
}));
app.use(responseMiddleware_1.default);
// Routes (prefixed with /api for consistency)
app.use("/api/test", async (req, res, next) => {
    res.status(201).json({});
});
app.use("/api/box", routes_1.boxRoutes);
app.use("/api/card", routes_1.cardRoutes);
app.use("/api/color", routes_1.colorRoutes);
app.use("/api/mold", routes_1.moldRoutes);
app.use("/api/scent", routes_1.scentRoutes);
app.use("/api/category", routes_1.categoryRoutes);
app.use("/api/product", routes_1.productRoutes);
app.use("/api/bill", routes_1.billRoutes);
app.use("/api/review", routes_1.reviewRoutes);
// Error handling middleware (must be last)
app.use(errorMiddleware_1.default);
// Initialize database and start server
const PORT = process.env.PORT || 8080;
const startServer = async () => {
    try {
        await (0, data_source_1.initializeDatabase)();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1); // Exit with failure code
    }
};
startServer();
