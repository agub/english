import React from 'react'
import BackButton from './common/BackButton'
import Button from './common/Button'
import InputField from './common/InputField'

import { PREF_OPTIONS } from '../data/Prefetures'

const ChangeAddress = ({
	homeAddress,
	postalCodeValue,
	postalCodeSetter,
	prefectureValue,
	prefectureSetter,
	addressValue,
	addressSetter,
	buildingValue,
	buildingSetter,
	component,
	submitHandler,
}) => {
	return (
		<>
			<BackButton onClick={component} />
			<h1 className='text-center'>住所の変更</h1>
			<div className='flex justify-between my-4'>
				<div>
					<p className='whitespace-nowrap font-bold text-sm text-gray-700 '>
						現住所:
					</p>
				</div>
				<div>
					{homeAddress ? (
						<>
							<p className='text-right'>
								〒{homeAddress.postalCode}
							</p>
							<p className='text-right'>
								{homeAddress.prefecture +
									homeAddress.address +
									homeAddress.building}
							</p>
						</>
					) : (
						<p>未登録</p>
					)}
					{/* <p>250-0038</p>
					<p>神奈川県小田原380-8 fasdfasfafdsaf</p> */}
				</div>
			</div>

			<div className='mb-1'>
				<InputField
					type='text'
					value={postalCodeValue}
					placeholder='xxxxxxx'
					label='郵便番号'
					// name='password'
					onChange={postalCodeSetter}
				/>
				<p className='text-sm text-right'>*自動で検索されます</p>
			</div>
			<div className='mb-4'>
				<label className='block text-gray-700 text-sm font-bold mb-2'>
					都道府県
				</label>
				<select
					id='data'
					name='gameTitle'
					value={prefectureValue}
					onChange={prefectureSetter}
					className='shadow border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
				>
					<option hidden>選択してください</option>
					{PREF_OPTIONS.map((item, key) => (
						<option key={key} value={item}>
							{item}
						</option>
					))}
				</select>
			</div>
			<div className='mb-4'>
				<InputField
					type='text'
					value={addressValue}
					placeholder='市区町村・番地'
					label='市区町村・番地'
					name='confirmPassword'
					onChange={addressSetter}
				/>
			</div>
			<div className='mb-4'>
				<InputField
					type='text'
					value={buildingValue}
					placeholder='建物名・部屋番号'
					label='建物名・部屋番号'
					name='confirmPassword'
					onChange={buildingSetter}
					notRequired
				/>
			</div>
			<div className='flex items-center justify-between'>
				<Button
					onClick={submitHandler}
					type='submit'
					bgColor='bg-blue-500'
					textColor='text-white'
					hoverColor='bg-blue-700'
					size='sm'
				>
					変更を保存
				</Button>
			</div>
		</>
	)
}

export default ChangeAddress
