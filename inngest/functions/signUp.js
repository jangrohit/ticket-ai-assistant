import { NonRetriableError } from "inngest";
import { inngest } from "../client";
import User from "./../../models/userModel.js";
import { sendMail } from "../../utils/mailer";

export const userSignUp = inngest.createFunction(
  { id: "user-sign-up", retries: 2 },
  { event: "user/sign-up" },
  async ({ event, step }) => {
    try {
      const { email } = event.data;
      const user = await step.run("get-user-email", async () => {
        const userObject = await User.findOne({ email });
        if (!userObject) throw NonRetriableError("User not found");
        return userObject;
      });
      await step.run("send-welcome-email", async () => {
        const subject = "Welcome to Ticket AI Assistant!";
        const text = `Hello ${user.email},\n\nThank you for signing up for Ticket AI Assistant! We're excited to have you on board.\n\nBest regards,\nThe Ticket AI Assistant Team`;
        await sendMail(user.email, subject, text);
        console.log(
          `Sending email to: ${user.email}\nSubject: ${subject}\n\n${text}`
        );
      });
      return { success: true };
    } catch (error) {
      console.error("Error in user sign-up function:", error);
      return { success: false };
    }
  }
);
