import {
	ORDER_LIST_MY_SUBSCRIPTION_FAIL,
	ORDER_LIST_MY_SUBSCRIPTION_REQUEST,
	ORDER_LIST_MY_SUBSCRIPTION_RESET,
	ORDER_LIST_MY_SUBSCRIPTION_SUCCESS,
	ORDER_SUBSCRIPTION_DATA_SET_FAIL,
	ORDER_SUBSCRIPTION_DATA_SET_REQUEST,
	ORDER_SUBSCRIPTION_DATA_SET_RESET,
	ORDER_SUBSCRIPTION_DATA_SET_SUCCESS,
	ORDER_SUBSCRIPTION_FAIL,
	ORDER_SUBSCRIPTION_REQUEST,
	ORDER_SUBSCRIPTION_RESET,
	ORDER_SUBSCRIPTION_SUCCESS,
	ORDER_UNSUBSCRIBE_FAIL,
	ORDER_UNSUBSCRIBE_REQUEST,
	ORDER_UNSUBSCRIBE_RESET,
	ORDER_UNSUBSCRIBE_SUCCESS,
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

export const orderDataSetReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_SUBSCRIPTION_DATA_SET_REQUEST:
			return {
				loading: true,
			}
		case ORDER_SUBSCRIPTION_DATA_SET_SUCCESS:
			return {
				loading: false,
				success: true,
				orderItems: action.payload,
			}
		case ORDER_SUBSCRIPTION_DATA_SET_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case ORDER_SUBSCRIPTION_DATA_SET_RESET:
			return {}
		default:
			return state
	}
}

export const orderListMySubscriptionReducer = (
	state = { orderItems: [] },
	action
) => {
	switch (action.type) {
		case ORDER_LIST_MY_SUBSCRIPTION_REQUEST:
			return {
				loading: true,
			}
		case ORDER_LIST_MY_SUBSCRIPTION_SUCCESS:
			return {
				loading: false,
				orderItems: action.payload,
			}
		case ORDER_LIST_MY_SUBSCRIPTION_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case ORDER_LIST_MY_SUBSCRIPTION_RESET:
			return { orderItems: [] }
		default:
			return state
	}
}

export const orderUnsubscribeReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_UNSUBSCRIBE_REQUEST:
			return {
				loading: true,
			}
		case ORDER_UNSUBSCRIBE_SUCCESS:
			return {
				loading: false,
				success: true,
				orderItems: action.payload,
			}
		case ORDER_UNSUBSCRIBE_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case ORDER_UNSUBSCRIBE_RESET:
			return {}
		default:
			return state
	}
}
