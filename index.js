import express from "express";
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
app.get(`${BASE_URL}/`, (req, res) => {
  res.status(200).send({ message: "app is working" });
});

app.listen(PORT, () =>
  console.log(`app is running on http://localhost:${PORT}${BASE_URL}`)
);
