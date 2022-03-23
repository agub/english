import React, { useState } from 'react'

const Calc2 = () => {
	const [wage, setWage] = useState('')
	const [rent, setRent] = useState('')
	const [expenses, setExpenses] = useState('')
	const [extra, setExtra] = useState('')
	const [saving, setSaving] = useState('')
	const [age, setAge] = useState('')
	const [debt, setDebt] = useState('')
	const [pension, setPension] = useState('')

	let convertWage = wage * 10000
	let convertExpenses = expenses * 10000
	let convertRent = rent * 10000
	let convertPension = pension * 10000
	let convertExtra = extra * 10000
	let convertSaving = saving * 10000
	let convertDebt = debt * 10000

	let yearlySaving =
		(convertWage -
			convertExpenses -
			convertRent +
			convertPension +
			convertExtra) *
		12
	let leftYears = age - 58
	let livingCost = yearlySaving * leftYears

	return (
		<>
			<div>
				<label>月給 : </label>
				<input
					onChange={(e) => {
						setWage(e.target.value)
					}}
					className='border w-10'
				/>{' '}
				万円
			</div>
			<div>
				<label>ーヶ月家賃 : </label>
				<input
					onChange={(e) => {
						setRent(e.target.value)
					}}
					className='border w-10'
				/>
				万円
			</div>
			<div>
				<label>食費 雑費 税金 : </label>
				<input
					onChange={(e) => {
						setExpenses(e.target.value)
					}}
					className='border w-10'
				/>
				万円
			</div>
			<div>
				<label>副収入 : </label>
				<input
					onChange={(e) => {
						setExpenses(e.target.value)
					}}
					className='border w-10'
				/>
				万円
			</div>
			<div>
				<label>年金 : </label>
				<input
					onChange={(e) => {
						setPension(e.target.value)
					}}
					className='border w-10'
				/>
				万円
			</div>
			<br />
			<div>
				<span>一年間の残り: </span>
				{new Intl.NumberFormat('ja-JP', { notation: 'compact' }).format(
					yearlySaving
				)}
				円
			</div>
			<br />
			<div>
				<label>何歳まで生きるか : </label>
				<input
					onChange={(e) => {
						setAge(e.target.value)
					}}
					className='border w-10'
				/>
				歳
			</div>
			<div>
				<label>貯蓄,売却含み益 : </label>
				<input
					onChange={(e) => {
						setSaving(e.target.value)
					}}
					className='border w-10'
				/>
				万円
			</div>
			<div>
				<label>借金 : </label>
				<input
					onChange={(e) => {
						setDebt(e.target.value)
					}}
					className='border w-10'
				/>
				万円
			</div>
			<br />
			<div>
				<span>生涯トータル: </span>
				{new Intl.NumberFormat('ja-JP', { notation: 'compact' }).format(
					livingCost - convertDebt + convertSaving
				)}
				円
			</div>
		</>
	)
}

export default Calc2
