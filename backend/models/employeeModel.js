import mongoose from 'mongoose'

const employeeSchema = mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			unique: true,
		},
		// students: [
		// 	{
		// 		type: mongoose.Schema.Types.ObjectId,
		// 		ref: 'User',
		// 		unique: true,
		// 	},
		// ],
		history: [
			{
				roomId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Room',
				},
				date: {
					type: String,
				},
				createdAt: {
					type: Date,
				},
			},
		],
		//______________________info______________________
		info: {
			discordId: {
				type: String,
			},
			gender: {
				type: String,
			},
			age: {
				type: Number,
			},
			gameLists: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Game',
				},
			],
			preferTime: [
				{
					week: { type: String },
					time: { type: Number },
					rank: { type: Number },
				},
			],
		},
		//______________________info______________________
	},
	{ timestamps: true }
)

const Employee = mongoose.model('Employee', employeeSchema)

export default Employee

