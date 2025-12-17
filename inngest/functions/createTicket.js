import { inngest } from "../client.js";
import Ticket from "../../models/ticketModel.js";
import User from "../../models/userModel.js";
import { NonRetriableError } from "inngest";
import {
  escapeRegex,
  TICKET_PRIORITY,
  TICKET_STATUS,
  USER_ROLES,
} from "../../utils/constant.js";
import { analyzeTicketAgent } from "../../utils/ticketAgent.js";
import { sendMail } from "../../utils/mailer.js";

export const ticketCreated = inngest.createFunction(
  { id: "ticket-created", retries: 2 },
  { event: "ticket/created" },
  async ({ event, step }) => {
    const { ticketId } = event.data;
    try {
      const ticket = await step.run("fetch-ticket", async () => {
        const ticketObject = await Ticket.findById(ticketId);
        if (!ticketObject) {
          throw new NonRetriableError("Ticket not found");
        }
        return ticketObject;
      });
      await step.run("update-ticket-status", async () => {
        await Ticket.findByIdAndUpdate(
          ticketId,
          {
            status: TICKET_STATUS.IN_PROGRESS,
          },
          { new: true }
        );
      });
      const aiResponse = await analyzeTicketAgent(ticket);

      const relatedSkills = await step.run("ai-processing", async () => {
        let skills = [];
        if (aiResponse) {
          await Ticket.findByIdAndUpdate(ticket._id, {
            priority: Object.values(TICKET_PRIORITY).includes(
              aiResponse.priority
            )
              ? aiResponse.priority
              : TICKET_PRIORITY.MEDIUM,
            deadline: aiResponse.deadline
              ? new Date(aiResponse.deadline)
              : null,
            helpfulNotes: aiResponse.helpfulNotes || "",
            relatedSkills: aiResponse.relatedSkills || [],
            status: TICKET_STATUS.IN_PROGRESS,
          });
          skills = aiResponse.relatedSkills || [];
        }
        return skills;
      });

      const moderator = await step.run("assign-moderator", async () => {
        let user = await User.findOne({
          role: USER_ROLES.MODERATOR,
          skills: {
            $elemMatch: {
              $regex: relatedSkills.map(escapeRegex).join("|"),
              $options: "i",
            },
          },
        });
        if (!user) user = await User.findOne({ role: USER_ROLES.ADMIN });
        await Ticket.findByIdAndUpdate(ticketId, { assignedTo: user?._id });
        return user;
      });
      await step.run("send-notification-mail", async () => {
        const ticket = await Ticket.findById(ticketId);
        const subject = "Ticket assigned!";
        const text = `Hello ${moderator.email},\n\nA new ticket ${ticket.title} is assigned to you with priority ${ticket.priority}\n\nBest regards,\nThe Ticket AI Assistant Team`;
        await sendMail(moderator.email, subject, text);
        console.log(
          `Sending email to: ${moderator.email}\nSubject: ${subject}\n\n${text}`
        );
      });
      return { success: true };
    } catch (error) {
      console.error("Error in ticket created function:", error);
      return { success: false };
    }
  }
);
