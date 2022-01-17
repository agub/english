import Container from './components/Container'
import Footer from './components/Footer'
import Nav from './components/Nav'

function App() {
	return (
		<>
			<Nav />
			<main className=''>
				<Container>Welcome to the platform</Container>
			</main>
			<Footer />
		</>
	)
}

export default App
