import { createTicket, getTicket, getTickets } from "../controllers/ticket.js";
import express from "express";
import { authenticate } from "../middleware/auth.js";

const route = express.Router();

route.get("/", authenticate, getTickets);
route.get("/:id", authenticate, getTicket);
route.post("/", authenticate, createTicket);

export default route;
