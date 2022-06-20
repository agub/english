import mongoose from 'mongoose'

const promotionSchema = mongoose.Schema(
	{
		email: {
			required: true,
			type: String,
		},
		code: {
			required: true,
			type: String,
		},
		students: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
	},
	{ timestamps: true }
)

const Promotion = mongoose.model('Promotion', promotionSchema)

export default Promotion

