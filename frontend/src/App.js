import Container from './components/Container'
import Footer from './components/Footer'
import Nav from './components/Nav'
import GameListsScreen from './screens/GameListsScreen'
import HomeScreen from './screens/HomeScreen'
import PostScreen from './screens/PostScreen'

function App() {
	return (
		<>
			<Nav />
			<main>
				{/* <HomeScreen /> */}
				{/* <PostScreen /> */}
				<GameListsScreen />
			</main>
			<Footer />
		</>
	)
}

export default App
