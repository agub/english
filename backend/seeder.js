import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import games from './data/games.js'
import User from './models/userModel.js'
import Game from './models/gameModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
	try {
		await Order.deleteMany()
		await Game.deleteMany()
		await User.deleteMany()

		// const createdUsers = await User.insertMany(users)

		// const adminUser = createdUsers[0]._id

		// const sampleGames = games.map((game) => {
		// 	return { ...game, user: adminUser }
		// })

		// await Game.insertMany(sampleGames)
		await Game.insertMany(games)
		await User.insertMany(users)

		console.log('Data imported!'.green.inverse)
		process.exit()
	} catch (error) {
		console.error(`${error}`.red.inverse)
		process.exit(1)
	}
}

const destroyData = async () => {
	try {
		await Order.deleteMany()
		await Game.deleteMany()
		await User.deleteMany()

		console.log('Data destroyed!'.red.inverse)
		process.exit()
	} catch (error) {
		console.error(`${error}`.red.inverse)
		process.exit(1)
	}
}

if (process.argv[2] === '-d') {
	destroyData()
} else {
	importData()
}
