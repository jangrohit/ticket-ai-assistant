import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/dbConnection.js";
import userRoutes from "./routes/user.js";
dotenv.config();
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL;

await connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(`${BASE_URL}`, userRoutes);

const server = app.listen(PORT, () =>
  console.log(`app is running on http://localhost:${PORT}`)
);
