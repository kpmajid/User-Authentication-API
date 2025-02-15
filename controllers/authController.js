import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { jwtSecret } from "../config/auth.config.js";
import User from "../models/User.js";

const register = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      fullName,
      gender,
      dateOfBirth,
      country,
    } = req.body;

    let isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      fullName,
      gender,
      dateOfBirth: new Date(dateOfBirth).toISOString().slice(0, 10),
      country,
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully!",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({ message: "Invalid username or password" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).send({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "1h" });
    res.cookie("jwt", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });

    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export { register, login };
