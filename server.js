import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import cookieParser from "cookie-parser";

dotenv.config();

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import conversationsRoutes from "./routes/conversations.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: JSON.parse(process.env.ORIGIN || '[]'),
		credentials: true,
	})
);
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/conversations", conversationsRoutes);

app.get("/", (req, res) => {
	res.json("Chatterz API Live");
});

app.listen(process.env.PORT || 3000, async () => {
	// MongoDB Connection
	await mongoose.connect(`${process.env.MONGO_URI}`);
	console.log(`DB Connected!`);
	console.log(`Origin Allowed to   => ${JSON.parse(process.env.ORIGIN || '[]')}`);
});
