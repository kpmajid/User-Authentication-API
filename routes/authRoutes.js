import express from "express";
import { register } from "../controllers/authController.js";
import validateRegister from "../middlewares/validateRegister.js";

const router = express.Router();

router.post("/register", validateRegister, register);

export default router;
