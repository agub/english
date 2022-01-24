import mongoose from 'mongoose'

const gameSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
})

const Game = mongoose.model('Game', gameSchema)

export default Game
