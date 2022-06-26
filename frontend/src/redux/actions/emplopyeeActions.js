import axios from 'axios'

import {
	EMPLOYEE_WAIT_LISTS_REQUEST,
	EMPLOYEE_WAIT_LISTS_SUCCESS,
	EMPLOYEE_WAIT_LISTS_FAIL,
} from '../constants/employeeConstant'

export const listWaitLists = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: EMPLOYEE_WAIT_LISTS_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}
		const { data } = await axios.get('/api/employees/waitLists', config)
		dispatch({ type: EMPLOYEE_WAIT_LISTS_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type: EMPLOYEE_WAIT_LISTS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

