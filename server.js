import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import cookieParser from "cookie-parser";

dotenv.config();

import dbConnection from "./db/dbConnection.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import conversationsRoutes from "./routes/conversations.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		// credentials: true,
	})
);
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/conversations", conversationsRoutes);

app.get("/", (req, res) => {
	res.json("Chatterz API Live");
});

app.listen(process.env.PORT || 3000, async () => {
	console.log(`Origin Allowed to -> ${process.env.CORS_ORIGIN}`);
	await dbConnection();
	console.log(
		`Server is running on port http://localhost:${process.env.PORT}`
	);
});
