import mongoose from "mongoose";
import { TICKET_PRIORITY, TICKET_STATUS } from "../utils/constant.js";

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: [TICKET_STATUS.OPEN, TICKET_STATUS.IN_PROGRESS, TICKET_STATUS.CLOSED],
    default: TICKET_STATUS.OPEN,
  },
  priority: {
    type: String,
    enum: [TICKET_PRIORITY.LOW, TICKET_PRIORITY.MEDIUM, TICKET_PRIORITY.HIGH],
    default: TICKET_PRIORITY.LOW,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deadline: { type: Date, default: null },
  helpfulNotes: { type: [String], default: [] },
  relatedSkills: { type: [String], default: [] },
});

export default mongoose.model("Ticket", ticketSchema);
