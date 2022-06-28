import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Nav from './components/Nav'
import GameListsScreen from './screens/GameListsScreen'
import GameScreen from './screens/GameScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import InterviewRegisterScreen from './screens/InterviewRegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import TeacherRegisterScreen from './screens/TeacherRegisterScreen'
import PaymentScreen from './screens/PaymentScreen'
import PaymentHistoryScreen from './screens/PaymentHistoryScreen'

import ChangeAddressScreen from './screens/ChangeAddressScreen'
import ChangeDiscordIdScreen from './screens/ChangeDiscordIdScreen'
import ChangePasswordScreen from './screens/ChangePasswordScreen'
import ChangeMatchedStatusScreen from './screens/ChangeMatchedStatusScreen'
import ChangeInterviewStatusScreen from './screens/ChangeInterviewStatusScreen'
import ContactScreen from './screens/ContactScreen'
import VerifyUserScreen from './screens/VerifyUserScreen'
import WaitListScreen from './screens/WaitListScreen'
import WaitListStudent from './screens/WaitListStudent'
import Calc from './screens/Calc'
import Calc2 from './screens/Calc2'
import Calc3 from './screens/Calc3'
import EvaluateScreen from './screens/EvaluateScreen'
import EvaluationHistoryListsScreen from './screens/EvaluationHistoryListsScreen'
import EvaluationHistoryScreen from './screens/EvaluationHistoryScreen'
import MyStudentScreen from './screens/MyStudentScreen'
import MyStudentListScreen from './screens/MyStudentListScreen'

function App() {
	return (
		<>
			<Nav />
			<Routes>
				<Route path='/' element={<HomeScreen />} exact />

				<Route path='/calc' element={<Calc />} />
				<Route path='/calc2' element={<Calc2 />} />
				<Route path='/calc3' element={<Calc3 />} />

				<Route path='/lists' element={<GameListsScreen />} />
				<Route path='/games/:id' element={<GameScreen />} />
				<Route path='/register' element={<RegisterScreen />} />
				<Route path='/login' element={<LoginScreen />} />
				<Route
					path='/interview'
					element={<InterviewRegisterScreen />}
				/>
				<Route path='/profile' element={<ProfileScreen />} exact />
				<Route
					path='/profile/discordId'
					element={<ChangeDiscordIdScreen />}
				/>
				<Route
					path='/profile/address'
					element={<ChangeAddressScreen />}
				/>
				<Route
					path='/profile/payment/history'
					element={<PaymentHistoryScreen />}
				/>
				<Route
					path='/profile/password'
					element={<ChangePasswordScreen />}
				/>
				<Route path='/profile/payment' element={<PaymentScreen />} />
				<Route path='/contact' element={<ContactScreen />} />

				<Route
					path='/teacher/register'
					element={<TeacherRegisterScreen />}
				/>
				<Route path='/teacher/waitList' element={<WaitListScreen />} />
				<Route
					path='/teacher/students'
					element={<MyStudentListScreen />}
				/>
				<Route
					path='/teacher/student/:id'
					element={<MyStudentScreen />}
				/>
				<Route
					path='/teacher/student/:id/evaluate'
					element={<EvaluateScreen />}
				/>
				<Route
					path='/teacher/student/:id/evaluations'
					element={<EvaluationHistoryListsScreen />}
				/>
				<Route
					path='/teacher/student/:id/evaluation/:_id'
					element={<EvaluationHistoryScreen />}
				/>

				{/* <Route path='/teacher/evaluate' element={<EvaluateScreen />} /> */}
				<Route
					path='/teacher/waitList/:id'
					element={<WaitListStudent />}
				/>
				<Route
					path='/verify/:id/:token'
					element={<VerifyUserScreen />}
				/>

				<Route path='/admin/userList' element={<UserListScreen />} />
				<Route path='/admin/:id/edit' element={<UserEditScreen />} />
				<Route
					path='/admin/:id/edit/status'
					element={<ChangeMatchedStatusScreen />}
				/>
				<Route
					path='/admin/:id/edit/interviewStatus'
					element={<ChangeInterviewStatusScreen />}
				/>
			</Routes>
			<Footer />
		</>
	)
}

export default App

