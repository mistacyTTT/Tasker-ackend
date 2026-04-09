import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app: Application = express();

// Middleware
app.use(cors({
    origin: "http://localhost:3000",
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

export default app;