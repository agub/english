import React from 'react'
import Container from '../components/common/Container'
import Contact from '../components/Contact'
import HomeTop from '../components/HomeTop'
import SwipeContainer from '../components/SwipeContainer'
import PriceHomeComponent from '../components/PriceHomeComponent'
import Loader from '../components/common/Loader'
import Message from '../components/common/Message'

const HomeScreen = () => {
	// var d = new Date()
	// var date = d.getDate()
	// var day = d.getDay()

	// var weekOfMonth = Math.ceil((date + 6 - day) / 7)
	// console.log(weekOfMonth)

	function padTo2Digits(num) {
		return num.toString().padStart(2, '0')
	}

	function formatDate(date) {
		return (
			[
				date.getFullYear(),
				padTo2Digits(date.getMonth() + 1),
				padTo2Digits(date.getDate()),
			].join('-') +
			' ' +
			[
				padTo2Digits(date.getHours()),
				padTo2Digits(date.getMinutes()),
			].join(':') +
			' - ' +
			[
				date.getFullYear(),
				padTo2Digits(date.getMonth() + 1),
				padTo2Digits(date.getDate()),
			].join('-') +
			' ' +
			[
				padTo2Digits(date.getHours()),
				padTo2Digits(date.getMinutes()),
			].join(':')
		)
	}

	function getClassWeek(startDate, weekNum, hoursNum, minuteNum) {
		var d = new Date(),
			month = d.getMonth(),
			classInMonth = []

		d.setDate(startDate)

		// Get the first weekday in the month
		while (d.getDay() !== weekNum) {
			d.setDate(d.getDate() + 1)
		}
		// Get all the other weekday in the month
		while (d.getMonth() === month) {
			d.setHours(hoursNum)
			d.setMinutes(minuteNum)
			// classInMonth.push(new Date(d.getTime()))
			classInMonth.push(formatDate(new Date(d.getTime())))
			d.setDate(d.getDate() + 7)
		}

		console.log(classInMonth)
	}

	getClassWeek(0, 6, 18, 0)

	return (
		<>
			<HomeTop />
			<Container>
				<h1 className='text-center'>Something Important</h1>
				<PriceHomeComponent />
				<Loader />
				<Message variant='info'>ログインいたしました。</Message>
				<h1>人気のゲーム</h1>
				<SwipeContainer showGames />
				<div>Review</div>
				<div>Q & A</div>
			</Container>
			<Contact />
		</>
	)
}

export default HomeScreen

