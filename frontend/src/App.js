import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Nav from './components/Nav'
import GameListsScreen from './screens/GameListsScreen'
import GameScreen from './screens/GameScreen'
import HomeScreen from './screens/HomeScreen'
import Login from './screens/Login'
import PostScreen from './screens/PostScreen'
import Register from './screens/Register'

function App() {
	return (
		<>
			<Nav />
			<Routes>
				<Route path='/' element={<HomeScreen />} exact />
				<Route path='/post' element={<PostScreen />} />
				<Route path='/lists' element={<GameListsScreen />} />
				<Route path='/game' element={<GameScreen />} />
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
			</Routes>
			<Footer />
		</>
	)
}

export default App
