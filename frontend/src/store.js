import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
	gameDetailsReducer,
	gameListReducer,
} from './redux/reducers/gameReducers'
import {
	userLoginReducer,
	userRegisterReducer,
	userTrialReducer,
	userRegisterTeacherReducer,
	userDetailsReducer,
	userProfileUpdateReducer,
	userListReducer,
	userUpdateReducer,
} from './redux/reducers/userReducers'

const reducer = combineReducers({
	gameList: gameListReducer,
	gameDetails: gameDetailsReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userTrial: userTrialReducer,
	userRegisterTeacher: userRegisterTeacherReducer,
	userDetails: userDetailsReducer,
	userProfileUpdate: userProfileUpdateReducer,
	userList: userListReducer,
	userUpdate: userUpdateReducer,
})
const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null

const initialState = {
	userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
