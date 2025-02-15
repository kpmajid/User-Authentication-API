import express from "express";
import { verifyToken } from "../middlewares/authJwt.js";
import { search } from "../controllers/userController.js";

const router = express.Router();

router.get("/search/", verifyToken, search);

export default router;
