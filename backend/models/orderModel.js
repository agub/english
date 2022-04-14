import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},

		orderItems: [
			{
				customerId: {
					required: true,
					type: String,
				},
				orderId: {
					required: true,
					type: String,
				},
				payment_method: {
					required: true,
					type: String,
				},
				plan: { type: String, required: true },
				price: { type: Number, required: true },
				email_address: { type: String },
				email: { type: String, required: true },
				fullName: {
					type: String,
					required: true,
				},
				isPaid: {
					type: Boolean,
					required: true,
					default: false,
				},
				//??????
				createdAt: {
					type: Date,
				},
				//??????
				isCancelled: {
					type: Boolean,
					default: false,
					required: true,
				},
			},
		],
		// paymentResult: {
		// 	id: { type: String },
		// 	status: { type: String },
		// 	update_time: { type: String },
		// 	email_address: { type: String },
		// },
		// totalPrice: {
		// 	type: Number,
		// 	required: true,
		// 	default: 0,
		// },
	},
	{ timestamps: true }
)

const Order = mongoose.model('Order', orderSchema)

export default Order

