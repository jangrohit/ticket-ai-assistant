import { inngest } from "../inngest/client.js";
import Ticket from "../models/ticketModel.js";
import { USER_ROLES } from "../utils/constant.js";
export const createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description)
      return res
        .status(400)
        .json({ message: "title or description is missing." });
    const ticket = await Ticket.create({
      title,
      description,
      createdBy: req.user._id.toString(),
    });
    await inngest.json({
      name: "ticket/created",
      data: { ticketId: ticket._id, ...ticket },
    });
    return res
      .status(201)
      .json({ message: "Ticket created and processing.", ticket });
  } catch (error) {
    console.error("Error in creating a ticket", error.message);
    return res.status(500).json({ message: "Error in creating a ticket" });
  }
};

export const getTickets = async (req, res) => {
  try {
    let tickets = [];
    const role = req.user.role;
    if (role !== USER_ROLES.USER) {
      tickets = await Ticket.find()
        .populate("assignedTo", "email _id")
        .sort({ createdAt: -1 });
    } else {
      tickets = await Ticket.find({ createdBy: req.user._id })
        .select("title description status createdAt")
        .sort({ createdAt: -1 });
    }
    return res.status(200).json(tickets);
  } catch (error) {
    console.error("Error in fetching a ticket", error.message);
    return res.status(500).json({ message: "Error in fetching a ticket" });
  }
};

export const getTicket = async (req, res) => {
  try {
    const user = req.user,
      { id = "" } = req.params;
    let ticket;
    if (user.role !== USER_ROLES.USER) {
      ticket = await Ticket.findById(id).populate("assignedTo", "email _id");
    } else
      ticket = await Ticket.findOne({
        createdBy: user._id,
        _id: id,
      }).select("title description status createdAt");
    if (!ticket)
      return res.status(404).json({ message: "Ticket is not found" });
    return res.status(200).json(ticket);
  } catch (error) {
    console.error("Error in fetching a ticket", error.message);
    return res.status(500).json({ message: "Error in fetching a ticket" });
  }
};
