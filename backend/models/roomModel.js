import mongoose from 'mongoose'

const roomSchema = mongoose.Schema(
	{
		student: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		candidate: [
			{
				teacherId: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'User',
				},
				rank: { type: Number },
			},
		],
	},
	{ timestamps: true }
)

const Room = mongoose.model('Room', roomSchema)

export default Room
