import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Nav from './components/Nav'
import GameListsScreen from './screens/GameListsScreen'
import HomeScreen from './screens/HomeScreen'
import PostScreen from './screens/PostScreen'

function App() {
	return (
		<>
			<Nav />
			<Routes>
				<Route path='/' element={<HomeScreen />} exact />
				{/* <main> */}
				<Route path='/post' element={<PostScreen />} />
				<Route path='/gamelists' element={<GameListsScreen />} />
				{/* <HomeScreen /> */}po
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
