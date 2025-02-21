import "dotenv/config";
import bcript from "bcryptjs";
import jwt from "jsonwebtoken";
import { softJobsModel } from "../models/softjobs.model.js";

const getUsuariosController = async (req, res) => {
  const { email } = req.user;
  try {
    const user = await softJobsModel.verifyEmail(email);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const newUser = {
      email: user.email,
      rol: user.rol,
      lenguage: user.lenguage,
    };
    return res.status(200).json([newUser]);
  } catch (error) {}
};
const postUsuariosController = async (req, res) => {
  const { email, password, rol, lenguage } = req.body;

  try {
    await softJobsModel.registerUser({
      email,
      password: bcript.hashSync(password, 10),
      rol,
      lenguage,
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const postLoginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await softJobsModel.verifyEmail(email);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = bcript.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      email,
      user_id: user.id,
      role: user.rol,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res
      .status(200)
      .json({ message: "User logged successfully", token, email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const softJobsController = {
  getUsuariosController,
  postUsuariosController,
  postLoginController,
};
