import {
	EMPLOYEE_WAIT_LISTS_FAIL,
	EMPLOYEE_WAIT_LISTS_REQUEST,
	EMPLOYEE_WAIT_LISTS_RESET,
	EMPLOYEE_WAIT_LISTS_SUCCESS,
	EMPLOYEE_MY_STUDENT_LISTS_REQUEST,
	EMPLOYEE_MY_STUDENT_LISTS_SUCCESS,
	EMPLOYEE_MY_STUDENT_LISTS_FAIL,
	EMPLOYEE_MY_STUDENT_LISTS_RESET,
} from '../constants/employeeConstant'

export const employeeWaitListsReducer = (state = { students: [] }, action) => {
	switch (action.type) {
		case EMPLOYEE_WAIT_LISTS_REQUEST:
			return { loading: true }
		case EMPLOYEE_WAIT_LISTS_SUCCESS:
			return { loading: false, students: action.payload, success: true }
		case EMPLOYEE_WAIT_LISTS_FAIL:
			return { loading: false, error: action.payload }
		case EMPLOYEE_WAIT_LISTS_RESET:
			return { students: [] }
		default:
			return state
	}
}

export const employeeMyStudentListsReducer = (
	state = { students: [] },
	action
) => {
	switch (action.type) {
		case EMPLOYEE_MY_STUDENT_LISTS_REQUEST:
			return { loading: true }
		case EMPLOYEE_MY_STUDENT_LISTS_SUCCESS:
			return { loading: false, students: action.payload, success: true }
		case EMPLOYEE_MY_STUDENT_LISTS_FAIL:
			return { loading: false, error: action.payload }
		case EMPLOYEE_MY_STUDENT_LISTS_RESET:
			return { students: [] }
		default:
			return state
	}
}

