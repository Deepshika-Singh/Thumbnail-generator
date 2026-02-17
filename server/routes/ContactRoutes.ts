import express from "express";
import { sendContactMessage } from "../controllers/ContactController.ts";

const router = express.Router();

router.post("/send", sendContactMessage);

export default router;