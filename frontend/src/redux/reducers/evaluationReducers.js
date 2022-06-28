import {
	EVALUATION_MY_LISTS_REQUEST,
	EVALUATION_MY_LISTS_SUCCESS,
	EVALUATION_MY_LISTS_FAIL,
	EVALUATION_MY_LISTS_RESET,
} from '../constants/evaluationConstants.js'

export const evaluationMyListsReducer = (
	state = { evaluation: {} },
	action
) => {
	switch (action.type) {
		case EVALUATION_MY_LISTS_REQUEST:
			return { loading: true, evaluation: {} }
		case EVALUATION_MY_LISTS_SUCCESS:
			return { loading: false, evaluation: action.payload }
		case EVALUATION_MY_LISTS_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

