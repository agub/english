import axios from 'axios'
import {
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_TRIAL_FAIL,
	USER_TRIAL_REQUEST,
	USER_TRIAL_SUCCESS,
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
