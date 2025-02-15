import jwt from "jsonwebtoken";

import { jwtSecret } from "../config/auth.config.js";

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ message: "Invalid token" });
  }
};

export { verifyToken };
