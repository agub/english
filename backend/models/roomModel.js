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
		schedule: {
			week: { type: Number },
			time: { type: Number },
			hour: { type: Number },
		},
		isActive: {
			type: Boolean,
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
				comment: { type: String },
			},
		],

		// deleteme
	},
	{ timestamps: true }
)

const Room = mongoose.model('Room', roomSchema)

export default Room

