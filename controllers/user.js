import User from "../models/userModel.js";

import { inngest } from "../inngest/client.js";
import { generateToken } from "../config/tokenGenerator.js";

export const signUpUser = async (req, res) => {
  const { email, password, skills = [] } = req.body;
  try {
    const user = await User.create({
      email,
      password,
      skills,
    });
    // fire inngest event
    await inngest.send({
      name: "user/sign-up",
      data: { email },
    });
    const token = generateToken(user);
    return res
      .status(201)
      .json({ user: { email: user.email, skills: user.skills }, token });
  } catch (error) {
    console.error("Error signing up user:", error);
    return res
      .status(500)
      .json({ message: "Server error", details: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = generateToken(user);
    return res.status(200).json({
      user: { email: user.email, role: user.role, skills: user.skills },
      token,
    });
  } catch (error) {
    console.error("Error signing up user:", error);
    return res
      .status(500)
      .json({ message: "Server error", details: error.message });
  }
};

export const logoutUser = async (req, res) => {
  // For JWT, logout is typically handled on the client side by deleting the token.
  // Optionally, you can implement token blacklisting on the server side.
  return res.status(200).json({ message: "User logged out successfully" });
};

export const updateUser = async (req, res) => {
  const { email, skills = [], role } = req.body;
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admin users can update user details" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await User.updateOne({ email }, { skills, role });
    return res.status(200).json({ user: updatedUser, message: "User updated" });
  } catch (error) {
    console.error("Error updating user:", error);
    return res
      .status(500)
      .json({ message: "Server error", details: error.message });
  }
};

export const getUsers = async (req, res) => {
  const role = req.user.role;
  try {
    if (role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admin users can update user details" });
    }
    const users = await User.find().select("-password");
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res
      .status(500)
      .json({ message: "Server error", details: error.message });
  }
};
