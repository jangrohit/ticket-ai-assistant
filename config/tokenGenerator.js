import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const generateToken = (user) => {
  const { _id: id, role, email } = user;
  return jwt.sign({ id, role, email }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
};
