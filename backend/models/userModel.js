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
				type: Boolean,
			},
			discordId: {
				type: String,
			},
			gender: {
				type: String,
			},
		},
		isTeacher: {
			type: Boolean,
			default: false,
		},
		isAdmin: {
			type: Boolean,
			default: false,
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
