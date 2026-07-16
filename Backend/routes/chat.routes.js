import express from "express";
const router = express.Router();
import { handleChat } from "../controllers/chat.controller.js";

router.post("/chat", handleChat);

export default router;