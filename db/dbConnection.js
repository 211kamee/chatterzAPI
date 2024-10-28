import mongoose from "mongoose";

export default async function dbConnection() {
	try {
		await mongoose.connect(`${process.env.MONGO_URI}`);
		console.log(`DB Connected!`);
	} catch (error) {
		console.log(`Error connecting to database: ${error.message}`);
	}
}
