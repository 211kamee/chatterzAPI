import express from "express";
import protectRoute from "../middlewares/protectRoute.middleware.js";
import { getConversations } from "../controllers/conversation.controller.js";
const router = express.Router();

router.get("/", protectRoute, getConversations);

export default router;
