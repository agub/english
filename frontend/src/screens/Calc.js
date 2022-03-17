import React, { useState } from 'react'

const Calc = () => {
	const [inputValue, setInputValue] = useState({
		wage: '',
		time: '',
		price: '',
		numPerson: '',
		numClass: '',
	})

	let per10Min = inputValue.wage / 60
	let perMonth = per10Min * inputValue.time * 4
	let margin = inputValue.price - perMonth
	let percent = (margin / inputValue.price) * 100

	let mutiplyRevenue = inputValue.numClass * inputValue.price
	let mutiplyMargin = margin * inputValue.numClass

	let totalRevenue = mutiplyRevenue * 12
	let totalMargin = mutiplyMargin * 12

	let withNumperson = margin * inputValue.numPerson
	let withNumpercent = percent * inputValue.numPerson

	return (
		<>
			<label>時給：</label>
			<input
				onChange={(e) => {
					setInputValue((prev) => ({
						...prev,
						wage: e.target.value,
					}))
				}}
				className='border w-20'
			></input>
			<br />
			<label>時間：</label>
			<input
				onChange={(e) => {
					setInputValue((prev) => ({
						...prev,
						time: e.target.value,
					}))
				}}
				className='border w-20'
			></input>
			<br />
			<label>値段: </label>
			<input
				onChange={(e) => {
					setInputValue((prev) => ({
						...prev,
						price: e.target.value,
					}))
				}}
				className='border w-20'
			></input>
			<br />
			<label>クラス人数：</label>
			<input
				onChange={(e) => {
					setInputValue((prev) => ({
						...prev,
						numPerson: e.target.value,
					}))
				}}
				className='border w-20'
			></input>

			<div>
				<span>給料: </span>
				{new Intl.NumberFormat('ja-JP', {
					style: 'currency',
					currency: 'JPY',
				}).format(perMonth)}
				{/* <span>¥{perMonth}</span> */}
			</div>
			<div>
				<span>儲け: </span>
				{new Intl.NumberFormat('ja-JP', {
					style: 'currency',
					currency: 'JPY',
				}).format(inputValue.numPerson !== '' ? withNumperson : margin)}
			</div>
			<div>
				<span>利益率: </span>
				{inputValue.numPerson !== '' ? withNumpercent : percent} %
			</div>
			<br />

			<label>総クラス数：</label>
			<input
				onChange={(e) => {
					setInputValue((prev) => ({
						...prev,
						numClass: e.target.value,
					}))
				}}
				className='border w-20'
			></input>
			<div>
				<span>一ヶ月売上: </span>
				{new Intl.NumberFormat('ja-JP', {
					style: 'currency',
					currency: 'JPY',
				}).format(
					inputValue.numClass === ''
						? inputValue.price
						: mutiplyRevenue
				)}
			</div>
			<div>
				<span>一ヶ月純利益: </span>
				{new Intl.NumberFormat('ja-JP', {
					style: 'currency',
					currency: 'JPY',
				}).format(mutiplyMargin !== 0 ? mutiplyMargin : margin)}
			</div>
			<br />
			<div>
				<span>年間売上: </span>
				{new Intl.NumberFormat('ja-JP', {
					style: 'currency',
					currency: 'JPY',
				}).format(totalRevenue)}
			</div>
			<div>
				<span>年間利益: </span>
				{new Intl.NumberFormat('ja-JP', {
					style: 'currency',
					currency: 'JPY',
				}).format(totalMargin)}
			</div>
			<div>
				<span>純利益: </span>
				{/* {new Intl.NumberFormat('ja-JP', {
					style: 'currency',
					currency: 'JPY',
				}).format(totalMargin)} */}
			</div>
		</>
	)
}

export default Calc
