import React, { useState } from 'react'

const Calc = () => {
	const [inputValue, setInputValue] = useState({
		wage: '',
		trialWage: '',
		trialTime: '',
		trialCount: '',
		time: '',
		price: '',
		numPerson: '',
		numClass: '',
		unSub: '',
	})

	let per10Min = inputValue.wage / 60
	let perMonth = per10Min * inputValue.time * 4.34524
	let profitPerMonth = inputValue.price - perMonth
	let MonthlyProfitRate = (profitPerMonth / inputValue.price) * 100

	let calcLossAmount = inputValue.unSub * perMonth

	let revenueMutiNumber =
		inputValue.numClass * inputValue.price * inputValue.numPerson
	let profitTimesPeople =
		profitPerMonth *
		(inputValue.numClass - inputValue.unSub) *
		inputValue.numPerson
	let monthlyNetProfit = profitTimesPeople - inputValue.unSub * perMonth

	let calcLoss3m = calcLossAmount * 3

	let totalRevenue = revenueMutiNumber * 12 - calcLoss3m
	let totalMargin = profitTimesPeople * 12
	// let totalNetProfit = monthlyNetProfit * 12
	let totalNetProfit = profitTimesPeople * 12 - calcLoss3m

	let withNumperson = profitPerMonth * inputValue.numPerson

	// let withNumpercent = deductPercent * inputValue.numPerson

	let deductLossFromMargin = totalNetProfit
	let totalProfitRate = (deductLossFromMargin / totalRevenue) * 100
	// let idealPercent = (totalNetProfit / totalMargin) * 100

	return (
		<>
			<div className='flex p-9'>
				<div className='w-64'>
					<p>通常時</p>
					<br />
					<label>先生の時給：</label>
					<input
						onChange={(e) => {
							setInputValue((prev) => ({
								...prev,
								wage: e.target.value,
							}))
						}}
						className='border w-20'
					></input>
					円
					<br />
					<label>授業の時間: ：</label>
					<input
						onChange={(e) => {
							setInputValue((prev) => ({
								...prev,
								time: e.target.value,
							}))
						}}
						className='border w-20'
					></input>
					分
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
					円
					<br />
					<label>クラスの人数：</label>
					<input
						onChange={(e) => {
							setInputValue((prev) => ({
								...prev,
								numPerson: e.target.value,
							}))
						}}
						className='border w-20'
					></input>
					人
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
						}).format(
							inputValue.numPerson !== ''
								? withNumperson
								: profitPerMonth
						)}
					</div>
					<div>
						<span>利益率　＊トライアル入れず: </span>
						{MonthlyProfitRate}
					</div>
					<br />
				</div>
			</div>

			<div className='p-9'>
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
				クラス
				<br />
				<label>3ヶ月後離脱: </label>
				<input
					onChange={(e) => {
						setInputValue((prev) => ({
							...prev,
							unSub: e.target.value,
						}))
					}}
					className='border w-20'
				></input>
				人
				<br />
				<br />
				<div>
					<span>一ヶ月売上: </span>
					{new Intl.NumberFormat('ja-JP', {
						style: 'currency',
						currency: 'JPY',
					}).format(
						inputValue.numClass === ''
							? inputValue.price
							: revenueMutiNumber
					)}
				</div>
				<div>
					<span>一ヶ月売上高利益: </span>
					{new Intl.NumberFormat('ja-JP', {
						style: 'currency',
						currency: 'JPY',
					}).format(
						profitTimesPeople !== 0
							? profitTimesPeople
							: profitPerMonth
					)}
				</div>
				<div>
					<span>一ヶ月純利益: </span>
					{new Intl.NumberFormat('ja-JP', {
						style: 'currency',
						currency: 'JPY',
					}).format(
						profitTimesPeople !== 0
							? monthlyNetProfit
							: profitPerMonth
					)}
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
					<span>年間売上高利益: </span>
					{new Intl.NumberFormat('ja-JP', {
						style: 'currency',
						currency: 'JPY',
					}).format(totalMargin)}
				</div>
				<div>
					<span>年間純利益: </span>
					{new Intl.NumberFormat('ja-JP', {
						style: 'currency',
						currency: 'JPY',
					}).format(totalNetProfit)}
				</div>
				<div>
					<span>利益率: </span>
					{totalProfitRate} %
				</div>
			</div>
		</>
	)
}

export default Calc

