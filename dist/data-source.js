"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
exports.initializeDatabase = initializeDatabase;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv = __importStar(require("dotenv"));
const Box_1 = require("./entities/Box");
const Card_1 = require("./entities/Card");
const Color_1 = require("./entities/Color");
const Mold_1 = require("./entities/Mold");
const Scent_1 = require("./entities/Scent");
const Category_1 = require("./entities/Category");
const Product_1 = require("./entities/Product");
const Bill_1 = require("./entities/Bill");
const Review_1 = require("./entities/Review");
dotenv.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    synchronize: process.env.NODE_ENV !== "production",
    logging: process.env.NODE_ENV === "development",
    entities: [
        Box_1.Box,
        Card_1.Card,
        Color_1.Color,
        Mold_1.Mold,
        Scent_1.Scent,
        Category_1.Category,
        Product_1.Product,
        Bill_1.Bill,
        Review_1.Review,
    ],
    migrations: ["src/migrations/*.ts"],
    subscribers: [],
});
async function initializeDatabase() {
    try {
        await exports.AppDataSource.initialize();
        console.log("Database connected successfully to Neon Postgres");
    }
    catch (err) {
        console.error("Database connection error:", err);
        process.exit(1);
    }
}
