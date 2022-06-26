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
				conversation: {
					type: Number,
				},
				effort: {
					type: Number,
				},
				concentration: {
					type: Number,
				},
				speaking: {
					type: Number,
				},
				overall: {
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

