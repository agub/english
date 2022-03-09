import axios from 'axios'
import {
	USER_CONTACT_FAIL,
	USER_CONTACT_REQUEST,
	USER_CONTACT_SUCCESS,
	USER_DETAILS_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_RESET,
	USER_DETAILS_SUCCESS,
	USER_LIST_FAIL,
	USER_LIST_REQUEST,
	USER_LIST_RESET,
	USER_LIST_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_PROFILE_UPDATE_FAIL,
	USER_PROFILE_UPDATE_REQUEST,
	USER_PROFILE_UPDATE_SUCCESS,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_TEACHER_FAIL,
	USER_REGISTER_TEACHER_REQUEST,
	USER_REGISTER_TEACHER_SUCCESS,
	USER_TEACHER_DETAILS_FAIL,
	USER_TEACHER_DETAILS_REQUEST,
	USER_TEACHER_DETAILS_SUCCESS,
	USER_TRIAL_FAIL,
	USER_TRIAL_REQUEST,
	USER_TRIAL_SUCCESS,
	USER_UPDATE_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	USER_VERIFY_FAIL,
	USER_VERIFY_REQUEST,
	USER_VERIFY_SUCCESS,
} from '../constants/userConstants'

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		})
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.post(
			'/api/users/login',
			{
				email,
				password,
			},
			config
		)
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		})

		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const trial = (object) => async (dispatch) => {
	try {
		dispatch({
			type: USER_TRIAL_REQUEST,
		})
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.post(
			'/api/users/trial',
			{
				...object,
			},
			config
		)
		console.log(object)
		dispatch({
			type: USER_TRIAL_SUCCESS,
			payload: data,
		})

		// localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		dispatch({
			type: USER_TRIAL_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const logout = () => (dispatch) => {
	localStorage.removeItem('userInfo')
	dispatch({ type: USER_LOGOUT })
	dispatch({ type: USER_DETAILS_RESET })
	dispatch({ type: USER_LIST_RESET })
}

export const register = (object) => async (dispatch) => {
	try {
		dispatch({
			type: USER_REGISTER_REQUEST,
		})
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { email, password, discordId } = object

		const { data } = await axios.post(
			'/api/users',
			{
				email,
				password,
				discordId,
			},
			config
		)

		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data,
		})
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		})

		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const teacherRegister = (object) => async (dispatch) => {
	try {
		dispatch({
			type: USER_REGISTER_TEACHER_REQUEST,
		})
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { email, password, name, info } = object

		const { data } = await axios.post(
			'/api/users/teacher',
			{
				email,
				password,
				name,
				info,
			},
			config
		)

		dispatch({
			type: USER_REGISTER_TEACHER_SUCCESS,
			payload: data,
		})
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		})

		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		dispatch({
			type: USER_REGISTER_TEACHER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const getUserDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_DETAILS_REQUEST,
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
		const { data } = await axios.get(`/api/users/${id}`, config)
		dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type: USER_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
export const getTeacherDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_TEACHER_DETAILS_REQUEST,
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
		const { data } = await axios.get(`/api/users/teacher/${id}`, config)
		dispatch({ type: USER_TEACHER_DETAILS_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type: USER_TEACHER_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const userProfileUpdate = (user) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_PROFILE_UPDATE_REQUEST,
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
		const { data } = await axios.put(`/api/users/profile`, user, config)
		dispatch({ type: USER_PROFILE_UPDATE_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type: USER_PROFILE_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const listUsers = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_LIST_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}
		const { data } = await axios.get(`/api/users`, config)
		dispatch({ type: USER_LIST_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type: USER_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const updateUser = (user) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_UPDATE_REQUEST,
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
		const { data } = await axios.put(`/api/users/${user._id}`, user, config)
		dispatch({ type: USER_UPDATE_SUCCESS })
		dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type: USER_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const sendMessage = (object) => async (dispatch) => {
	try {
		dispatch({
			type: USER_CONTACT_REQUEST,
		})

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		await axios.post(`/api/users/contact`, object, config)
		dispatch({ type: USER_CONTACT_SUCCESS })
	} catch (error) {
		dispatch({
			type: USER_CONTACT_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const verifyUser = (id, token) => async (dispatch) => {
	try {
		dispatch({
			type: USER_VERIFY_REQUEST,
		})
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.post(
			`/api/users/verify/${id}/${token}`,
			{ id, token },
			config
		)
		dispatch({
			type: USER_VERIFY_SUCCESS,
			payload: data,
		})

		console.log(data)
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message

		dispatch({
			type: USER_VERIFY_FAIL,
			payload: message,
		})
	}
}
