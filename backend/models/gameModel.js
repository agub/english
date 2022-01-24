import mongoose from 'mongoose'

const gameSchema = mongoose.schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
})
