import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Nav from './components/Nav'
import GameListsScreen from './screens/GameListsScreen'
import GameScreen from './screens/GameScreen'
import HomeScreen from './screens/HomeScreen'
import PostScreen from './screens/PostScreen'
import TeachersScreen from './screens/TeacherListsScreen'

function App() {
	return (
		<>
			<Nav />
			<Routes>
				<Route path='/' element={<HomeScreen />} exact />
				{/* <main> */}
				<Route path='/post' element={<PostScreen />} />
				<Route path='/lists' element={<GameListsScreen />} />
				<Route path='/teachers' element={<TeachersScreen />} />
				<Route path='/game' element={<GameScreen />} />
				{/* <HomeScreen /> */}
				{/* <PostScreen /> */}
				{/* <GameListsScreen /> */}
				{/* <Route path='/gamelists' component={GameListsScreen} /> */}
				{/* </main> */}
				{/* <Footer /> */}
			</Routes>
		</>
	)
}

export default App
