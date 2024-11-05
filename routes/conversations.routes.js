import express from "express";
import protectRoute from "../middlewares/protectRoute.middleware.js";
import {
	getConversations,
	getPeople,
} from "../controllers/conversation.controller.js";
const router = express.Router();

router.get("/", protectRoute, getConversations);
router.get("/people", protectRoute, getPeople);

export default router;
