import {
	EVALUATION_MY_LISTS_REQUEST,
	EVALUATION_MY_LISTS_SUCCESS,
	EVALUATION_MY_LISTS_FAIL,
	EVALUATION_MY_LISTS_RESET,
	EVALUATION_STUDENT_REQUEST,
	EVALUATION_STUDENT_SUCCESS,
	EVALUATION_STUDENT_FAIL,
	EVALUATION_STUDENT_RESET,
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
		case EVALUATION_MY_LISTS_RESET:
			return {}
		default:
			return state
	}
}
export const evaluationStudentReducer = (state = {}, action) => {
	switch (action.type) {
		case EVALUATION_STUDENT_REQUEST:
			return { loading: true }
		case EVALUATION_STUDENT_SUCCESS:
			return { loading: false, success: true }
		case EVALUATION_STUDENT_FAIL:
			return { loading: false, error: action.payload }
		case EVALUATION_STUDENT_RESET:
			return {}
		default:
			return state
	}
}

