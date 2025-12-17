import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/dbConnection.js";
import userRoutes from "./routes/user.js";
import ticketRoutes from "./routes/ticket.js";
import { serve } from "inngest/express";
import { inngest } from "./inngest/client.js";
import { ticketCreated } from "./inngest/functions/createTicket.js";
import { userSignUp } from "./inngest/functions/signUp.js";
dotenv.config();
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL;

await connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(`${BASE_URL}`, userRoutes);
app.use(`${BASE_URL}/ticket`, ticketRoutes);
app.use(
  `${BASE_URL}/inngest`,
  serve({
    client: inngest,
    functions: [ticketCreated, userSignUp],
  })
);
app.get(`${BASE_URL}/`, (req, res) => {
  res.status(200).send({ message: "app is working" });
});

app.listen(PORT, () =>
  console.log(`app is running on http://localhost:${PORT}${BASE_URL}`)
);
