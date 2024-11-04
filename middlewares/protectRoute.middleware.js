import jsonwebtoken from "jsonwebtoken";
import User from "../models/user.models.js";

const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.token;

		if (!token) {
			return res.status(500).json(`Not logged in.`);
		}

		const decodedToken = jsonwebtoken.verify(
			token,
			process.env.ACCESS_TOKEN_SECRET
		);

		if (!decodedToken) {
			return res.status(500).json(`Not logged in.`);
		}

		const user = await User.findOne({ _id: decodedToken._id }).select(
			"_id"
		);

		if (!user) {
			return res.status(500).json(`Unauthorised!`);
		}

		req.user = user;

		next();
	} catch (error) {
		res.status(500).json([error.message, error]);
	}
};
export default protectRoute;
