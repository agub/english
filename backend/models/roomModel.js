import mongoose from 'mongoose'

const roomSchema = mongoose.Schema(
	{
		students: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		teacher: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		time: {
			week: { type: String },
			time: { type: Number },
		},
		game: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Game',
		},
		candidate: [
			{
				teacherId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
				},
				rank: { type: Number },
			},
		],
		isWaiting: { type: Boolean, default: true },
	},
	{ timestamps: true }
)

const Room = mongoose.model('Room', roomSchema)

export default Room
