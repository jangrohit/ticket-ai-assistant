import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { USER_ROLES } from "../utils/constant.js";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: [USER_ROLES.USER, USER_ROLES.ADMIN, USER_ROLES.MODERATOR],
    default: USER_ROLES.USER,
  },
  skills: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model("User", userSchema);
