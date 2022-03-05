import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Nav from './components/Nav'
import GameListsScreen from './screens/GameListsScreen'
import GameScreen from './screens/GameScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import TrialRegisterScreen from './screens/TrialRegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import TeacherRegisterScreen from './screens/TeacherRegisterScreen'
import PaymentScreen from './screens/PaymentScreen'


function App() {
	return (
		<>
			<Nav />
			<Routes>
				<Route path='/' element={<HomeScreen />} exact />
				<Route path='/lists' element={<GameListsScreen />} />
				<Route path='/games/:id' element={<GameScreen />} />
				<Route path='/register' element={<RegisterScreen />} />
				<Route path='/login' element={<LoginScreen />} />
				<Route path='/trial' element={<TrialRegisterScreen />} />
				<Route path='/profile' element={<ProfileScreen />} />
				<Route path='/payment' element={<PaymentScreen />} />
				<Route
					path='/teacher/register'
					element={<TeacherRegisterScreen />}
				/>
				<Route path='/admin/userList' element={<UserListScreen />} />
				<Route path='/admin/:id/edit' element={<UserEditScreen />} />
			</Routes>
			<Footer />
		</>
	)
}

export default App
