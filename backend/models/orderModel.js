import mongoose from 'mongoose'

const orderSchema = mongoose.schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		orderItem: [
			{
				plan: { type: String, required: true },
				price: { type: Number, required: true },
				game: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Game',
				},
			},
		],
		fullName: {
			type: String,
			required: true,
		},
		paymentResult: {
			id: { type: String },
			status: { type: String },
			update_time: { type: String },
			email_address: { type: String },
		},
		totalPrice: {
			type: Number,
			required: true,
			default: 0,
		},
		isPaid: {
			type: Boolean,
			required: true,
			default: false,
		},
		paidAt: {
			type: Date,
		},
	},
	{ timestamps: true }
)

const Order = mongoose.model('User', orderSchema)

export default Order
