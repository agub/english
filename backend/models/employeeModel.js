import mongoose from 'mongoose'

const employeeSchema = mongoose.Schema({
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
})

const Employee = mongoose.model('Employee', employeeSchema)

export default Employee
