import axios from 'axios'
import {
	ORDER_SUBSCRIPTION_DATA_SET_FAIL,
	ORDER_SUBSCRIPTION_DATA_SET_REQUEST,
	ORDER_SUBSCRIPTION_DATA_SET_SUCCESS,
	ORDER_SUBSCRIPTION_FAIL,
	ORDER_SUBSCRIPTION_REQUEST,
	ORDER_SUBSCRIPTION_SUCCESS,
} from '../constants/orderConstants'

export const orderSubscription =
	(paymentMethod) => async (dispatch, getState) => {
		try {
			dispatch({
				type: ORDER_SUBSCRIPTION_REQUEST,
			})

			console.log(paymentMethod)
			const {
				userLogin: { userInfo },
			} = getState()

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			}

			const { data } = await axios.post(
				`/api/orders/subscription`,
				paymentMethod,
				config
			)

			console.log(data)
			dispatch({
				type: ORDER_SUBSCRIPTION_SUCCESS,
				payload: data,
			})
			// dispatch(
			// 	updateShippingFee(orderId, {
			// 		shippingFee: paymentDetails.metadata.shippingFee,
			// 		totalPriceCal: paymentDetails.amount,
			// 		shippingType: paymentDetails.shippingType,
			// 	})
			// )
		} catch (error) {
			const message =
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			if (message === 'Not authorized, token failed') {
				// dispatch(logout())
			}
			dispatch({
				type: ORDER_SUBSCRIPTION_FAIL,
				payload: message,
			})
		}
	}

export const orderSetData = (orderItem) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_SUBSCRIPTION_DATA_SET_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.post(`/api/orders`, orderItem, config)

		dispatch({
			type: ORDER_SUBSCRIPTION_DATA_SET_SUCCESS,
			payload: data,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'Not authorized, token failed') {
			// dispatch(logout())
		}
		dispatch({
			type: ORDER_SUBSCRIPTION_DATA_SET_FAIL,
			payload: message,
		})
	}
}
