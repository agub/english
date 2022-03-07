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
	userTeacherDetailsReducer,
	userProfileUpdateReducer,
	userListReducer,
	userUpdateReducer,
} from './redux/reducers/userReducers'
import {
	orderStripeReducer,
	orderDataSetReducer,
	orderListMySubscriptionReducer,
	orderUnsubscribeReducer,
} from './redux/reducers/orderReducers'

const reducer = combineReducers({
	gameList: gameListReducer,
	gameDetails: gameDetailsReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userTrial: userTrialReducer,
	userRegisterTeacher: userRegisterTeacherReducer,
	userDetails: userDetailsReducer,
	userTeacherDetails: userTeacherDetailsReducer,
	userProfileUpdate: userProfileUpdateReducer,
	userList: userListReducer,
	userUpdate: userUpdateReducer,
	orderStripe: orderStripeReducer,
	orderDataSet: orderDataSetReducer,
	orderListMySubscription: orderListMySubscriptionReducer,
	orderUnsubscribe: orderUnsubscribeReducer,
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
