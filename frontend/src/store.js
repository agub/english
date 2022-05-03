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
	userInterviewReducer,
	userRegisterTeacherReducer,
	userDetailsReducer,
	userTeacherDetailsReducer,
	userProfileUpdateReducer,
	userListReducer,
	userUpdateReducer,
	userContactReducer,
	userVerifyReducer,
	userWaitListsReducer,
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
	userInterview: userInterviewReducer,
	userRegisterTeacher: userRegisterTeacherReducer,
	userDetails: userDetailsReducer,
	userTeacherDetails: userTeacherDetailsReducer,
	userProfileUpdate: userProfileUpdateReducer,
	userList: userListReducer,
	userContact: userContactReducer,
	userUpdate: userUpdateReducer,
	userVerify: userVerifyReducer,
	userWaitLists: userWaitListsReducer,
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

