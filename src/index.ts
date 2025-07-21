import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { initializeDatabase } from "./data-source";
import errorMiddleware from "./middleware/errorMiddleware";
import responseMiddleware from "./middleware/responseMiddleware";
import { productRoutes, boxRoutes, cardRoutes, colorRoutes, moldRoutes, scentRoutes, categoryRoutes, billRoutes, reviewRoutes } from "./routes";

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(
  cors({
    origin: '*', // Allow your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Support cookies/auth headers if needed
  })
);
app.use(responseMiddleware);

// Routes (prefixed with /api for consistency)
app.use("/api/test", async (req, res, next) => {
  res.status(201).json({});
})
app.use("/api/box", boxRoutes);
app.use("/api/card", cardRoutes);
app.use("/api/color", colorRoutes);
app.use("/api/mold", moldRoutes);
app.use("/api/scent", scentRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/bill", billRoutes);
app.use("/api/review", reviewRoutes);


// Error handling middleware (must be last)
app.use(errorMiddleware);

// Initialize database and start server
const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1); // Exit with failure code
  }
};

startServer();