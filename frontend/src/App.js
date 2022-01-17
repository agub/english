import Container from './components/Container'
import Footer from './components/Footer'
import Nav from './components/Nav'
import HomeScreen from './screens/HomeScreen'

function App() {
	return (
		<>
			<Nav />
			<main>
				<Container>
					<HomeScreen />
				</Container>
			</main>
			<Footer />
		</>
	)
}

export default App
