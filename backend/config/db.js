import mongoose from 'mongoose'

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URL)
		console.log(
			`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold
		)
	} catch (error) {
		console.error(`Error: ${error}`.red.underline.bold)
		process.exit(1)
	}
}

export default connectDB
