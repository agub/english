import {
	ORDER_SUBSCRIPTION_FAIL,
	ORDER_SUBSCRIPTION_REQUEST,
	ORDER_SUBSCRIPTION_RESET,
	ORDER_SUBSCRIPTION_SUCCESS,
} from '../constants/orderConstants'

export const orderStripeReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_SUBSCRIPTION_REQUEST:
			return {
				loading: true,
			}
		case ORDER_SUBSCRIPTION_SUCCESS:
			return {
				loading: false,
				success: true,
				data: action.payload,
			}
		case ORDER_SUBSCRIPTION_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		// case ORDER_LOADING_STOP:
		// 	return {
		// 		loading: false,
		// 	}
		case ORDER_SUBSCRIPTION_RESET:
			return {}
		default:
			return state
	}
}
