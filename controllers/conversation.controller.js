import Conversation from "../models/conversation.model.js";
import User from "../models/user.models.js";

export const getConversations = async (req, res) => {
	try {
		const userID = req.user._id;

		const conversations = await Conversation.find({
			participants: { $all: [userID] },
		});

		if (!conversations) {
			return res.status(200).json([]);
		}

		return res.status(200).json(conversations);
	} catch (error) {
		res.status(500).json([error.message, error]);
	}
};

export const getPeople = async (req, res) => {
	try {
		const loggedInUser = req.user;

		const people = await User.find({
			_id: { $ne: loggedInUser },
		}).select("username");

		if (!people) {
			return res.status(200).json([]);
		}

		return res.status(200).json(people);
	} catch (error) {
		res.status(500).json(error.message);
		console.log(error);
	}
};
