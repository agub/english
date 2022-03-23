import mongoose from 'mongoose'

const customerSchema = mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			unique: true,
			required: true,
		},
		homeAddress: {
			postalCode: { type: String || Number },
			prefecture: { type: String },
			address: { type: String },
			building: { type: String },
		},
		//______________________info______________________
		info: {
			phoneNumber: {
				type: String,
			},
			age: {
				type: Number,
			},
			consoleType: {
				type: String,
			},
			contactBy: {
				type: String,
			},
			experience: {
				type: Number,
			},
			gameLists: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Game',
				},
			],
			rentMixer: {
				type: String,
			},
			preferTime: [
				{
					week: { type: String },
					time: { type: Number },
					rank: { type: Number },
				},
			],
			discordId: {
				type: String,
			},
			gender: {
				type: String,
			},
		},
	},
	{ timestamps: true }
)

const Customer = mongoose.model('Customer', customerSchema)

export default Customer
