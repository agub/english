import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
		},
		verify: {
			type: String,
		},
		name: {
			firstName: {
				type: String,
			},
			lastName: {
				type: String,
			},
			kanaFirstName: {
				type: String,
			},
			kanaLastName: {
				type: String,
			},
		},
		//______________________Moved to customer or employee Model______________________
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
			gameTitle: {
				type: String,
			},
			gameLists: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Game',
					// type: String,
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
		},
		homeAddress: {
			postalCode: { type: String || Number },
			prefecture: { type: String },
			address: { type: String },
			building: { type: String },
		},
		//______________________Moved to customer or employee Model______________________
		// isSubscribe: {
		// 	type: Boolean,
		// 	default: false,
		// },
		hasMatched: {
			type: Boolean,
			default: false,
		},
		hadTrial: {
			type: Boolean,
			default: false,
		},
		//______________________Moved to room model______________________
		teacher: {
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
		//______________________Moved to room model______________________

		//______________________admin, customer, employee______________________
		isTeacher: {
			type: Boolean,
			default: false,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		//______________________admin, customer, employee______________________
		roomId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Room',
		},
	},
	{ timestamps: true }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next()
	}

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
