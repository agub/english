import mongoose from 'mongoose'

const employeeSchema = mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		unique: true,
	},
	students: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			unique: true,
		},
	],
	//______________________info______________________
	phoneNumber: {
		type: String,
	},
	age: {
		type: Number,
	},
	consoleType: {
		type: String,
	},
	gameLists: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Game',
		},
	],
	contactBy: {
		type: String,
	},
	experience: {
		type: Number,
	},
	preferTime: [
		{
			week: { type: String },
			time: { type: Number },
			rank: { type: Number },
		},
	],
	rentMixer: {
		type: String,
	},
	discordId: {
		type: String,
	},
	gender: {
		type: String,
	},
	//______________________info______________________
})

const Employee = mongoose.model('Employee', employeeSchema)

export default Employee
