import mongoose from 'mongoose'

const evaluationSchema = mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		evaluations: [
			{
				overall: {
					type: Number,
				},
				conversation: {
					type: Number,
				},
				effort: {
					type: Number,
				},
				improvement: {
					type: Number,
				},
				concentration: {
					type: Number,
				},
				speaking: {
					type: Number,
				},
				comment: {
					type: String,
				},
				createdAt: {
					type: Date,
				},
			},
		],
	},
	{ timestamps: true }
)

const Evaluation = mongoose.model('Evaluation', evaluationSchema)

export default Evaluation

