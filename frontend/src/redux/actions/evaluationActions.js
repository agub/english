import axios from 'axios'
import {
	EVALUATION_MY_LISTS_REQUEST,
	EVALUATION_MY_LISTS_SUCCESS,
	EVALUATION_MY_LISTS_FAIL,
	EVALUATION_MY_LISTS_RESET,
} from '../constants/evaluationConstants.js'

export const listMyEvaluations = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: EVALUATION_MY_LISTS_REQUEST })
		const {
			userLogin: { userInfo },
		} = getState()

		console.log(userInfo)
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}
		const { data } = await axios.get(`/api/evaluations/${id}`, config)
		dispatch({ type: EVALUATION_MY_LISTS_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type: EVALUATION_MY_LISTS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

