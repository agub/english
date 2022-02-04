import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		fullName: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: String,
			required: true,
		},
		age: {
			type: Number,
			required: true,
		},
		consoleType: {
			type: String,
			required: true,
		},
		gameTitle: {
			type: String,
			required: true,
		},
		contactBy: {
			type: String,
			required: true,
		},
		experience: {
			type: Number,
			required: true,
		},
		preferTime: [
			{
				week: { type: String, required: true },
				time: { type: Number, required: true },
				rank: { type: Number, required: true },
			},
		],
		rentMixer: {
			type: Boolean,
		},
	},
	{ timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User
