import {
  getUsers,
  loginUser,
  logoutUser,
  signUpUser,
  updateUser,
} from "../controllers/user.js";
import express from "express";
import { authenticate } from "../middleware/auth.js";

const route = express.Router();

route.put("/update", authenticate, updateUser);
route.get("/users", authenticate, getUsers);

route.post("/signUp", signUpUser);
route.post("/login", loginUser);
route.post("/logout", logoutUser);
export default route;
