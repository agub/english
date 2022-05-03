import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_INTERVIEW_REQUEST,
	USER_INTERVIEW_SUCCESS,
	USER_INTERVIEW_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
	USER_PROFILE_UPDATE_REQUEST,
	USER_PROFILE_UPDATE_SUCCESS,
	USER_PROFILE_UPDATE_FAIL,
	USER_PROFILE_UPDATE_RESET,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAIL,
	USER_LIST_RESET,
	USER_DETAILS_RESET,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,
	USER_UPDATE_RESET,
	USER_REGISTER_TEACHER_REQUEST,
	USER_REGISTER_TEACHER_SUCCESS,
	USER_REGISTER_TEACHER_FAIL,
	USER_TEACHER_DETAILS_REQUEST,
	USER_TEACHER_DETAILS_SUCCESS,
	USER_TEACHER_DETAILS_FAIL,
	USER_TEACHER_DETAILS_RESET,
	USER_CONTACT_REQUEST,
	USER_CONTACT_SUCCESS,
	USER_CONTACT_FAIL,
	USER_CONTACT_RESET,
	USER_VERIFY_REQUEST,
	USER_VERIFY_SUCCESS,
	USER_VERIFY_FAIL,
	USER_VERIFY_RESET,
	USER_WAIT_LISTS_REQUEST,
	USER_WAIT_LISTS_SUCCESS,
	USER_WAIT_LISTS_FAIL,
	USER_WAIT_LISTS_RESET,
} from '../constants/userConstants.js'

export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true }
		case USER_LOGIN_SUCCESS:
			return { loading: false, userInfo: action.payload }
		case USER_LOGIN_FAIL:
			return { loading: false, error: action.payload }
		case USER_LOGOUT:
			return {}
		default:
			return state
	}
}

export const userInterviewReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_INTERVIEW_REQUEST:
			return { loading: true }
		case USER_INTERVIEW_SUCCESS:
			return { loading: false, success: true }
		case USER_INTERVIEW_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const userRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { loading: true }
		case USER_REGISTER_SUCCESS:
			return { loading: false, userInfo: action.payload }
		case USER_REGISTER_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const userRegisterTeacherReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_REGISTER_TEACHER_REQUEST:
			return { loading: true }
		case USER_REGISTER_TEACHER_SUCCESS:
			return { loading: false, userInfo: action.payload }
		case USER_REGISTER_TEACHER_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const userDetailsReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case USER_DETAILS_REQUEST:
			return { ...state, loading: true }
		case USER_DETAILS_SUCCESS:
			return { loading: false, user: action.payload }
		case USER_DETAILS_FAIL:
			return { loading: false, error: action.payload }
		case USER_DETAILS_RESET:
			return { user: {} }
		default:
			return state
	}
}
export const userTeacherDetailsReducer = (state = { teacher: {} }, action) => {
	switch (action.type) {
		case USER_TEACHER_DETAILS_REQUEST:
			return { ...state, loading: true }
		case USER_TEACHER_DETAILS_SUCCESS:
			return { loading: false, success: true, teacher: action.payload }
		case USER_TEACHER_DETAILS_FAIL:
			return { loading: false, error: action.payload }
		case USER_TEACHER_DETAILS_RESET:
			return { user: {} }
		default:
			return state
	}
}
export const userProfileUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_PROFILE_UPDATE_REQUEST:
			return { loading: true }
		case USER_PROFILE_UPDATE_SUCCESS:
			return { loading: false, success: true, userInfo: action.payload }
		case USER_PROFILE_UPDATE_FAIL:
			return { loading: false, error: action.payload }
		case USER_PROFILE_UPDATE_RESET:
			return {}
		default:
			return state
	}
}
export const userListReducer = (state = { users: [] }, action) => {
	switch (action.type) {
		case USER_LIST_REQUEST:
			return { loading: true }
		case USER_LIST_SUCCESS:
			return { loading: false, users: action.payload }
		case USER_LIST_FAIL:
			return { loading: false, error: action.payload }
		case USER_LIST_RESET:
			return { users: [] }
		default:
			return state
	}
}

export const userUpdateReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case USER_UPDATE_REQUEST:
			return { loading: true }
		case USER_UPDATE_SUCCESS:
			return { loading: false, success: true }
		case USER_UPDATE_FAIL:
			return { loading: false, error: action.payload }
		case USER_UPDATE_RESET:
			return { user: [] }
		default:
			return state
	}
}

export const userContactReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_CONTACT_REQUEST:
			return { loading: true }
		case USER_CONTACT_SUCCESS:
			return { loading: false, success: true }
		case USER_CONTACT_FAIL:
			return { loading: false, error: action.payload }
		case USER_CONTACT_RESET:
			return {}
		default:
			return state
	}
}

export const userVerifyReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_VERIFY_REQUEST:
			return { loading: true }
		case USER_VERIFY_SUCCESS:
			return { loading: false, success: true }
		case USER_VERIFY_FAIL:
			return { loading: false, error: action.payload }
		case USER_VERIFY_RESET:
			return {}
		default:
			return state
	}
}

export const userWaitListsReducer = (state = { students: [] }, action) => {
	switch (action.type) {
		case USER_WAIT_LISTS_REQUEST:
			return { loading: true }
		case USER_WAIT_LISTS_SUCCESS:
			return { loading: false, students: action.payload, success: true }
		case USER_WAIT_LISTS_FAIL:
			return { loading: false, error: action.payload }
		case USER_WAIT_LISTS_RESET:
			return { students: [] }
		default:
			return state
	}
}

