import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import BackButton from '../components/common/BackButton'
import Button from '../components/common/Button'
import InputField from '../components/common/InputField'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'
import Message from '../components/common/Message'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, userProfileUpdate } from '../redux/actions/userActions'
import {
	USER_DETAILS_RESET,
	USER_PROFILE_UPDATE_RESET,
} from '../redux/constants/userConstants'
import { usePostalJp } from 'use-postal-jp'
import IsObjectEmpty from '../components/common/IsObjectEmpty'

import { PREF_OPTIONS } from '../utils/Prefectures'
import Loader from '../components/common/Loader'

const ChangeAddressScreen = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const initialValue = {
		postalCode: '',
		address: '',
		prefecture: '',
		building: '',
	}

	const [inputValue, setInputValue] = useState(initialValue)

	const { postalCode, prefecture, address, building } = inputValue
	const [autoAddress] = usePostalJp(postalCode, postalCode.length >= 7)

	const userDetails = useSelector((state) => state.userDetails)
	const { loading, user, error } = userDetails

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const userUpdate = useSelector((state) => state.userProfileUpdate)
	const {
		success,
		error: userUpdateError,
		loading: userUpdateLoading,
	} = userUpdate

	useEffect(() => {
		if (!userInfo) {
			navigate('/login')
		} else {
			if (IsObjectEmpty(user)) {
				dispatch(getUserDetails('profile'))
				console.log('getUSerDetails')
			} else {
				console.log('user found')
			}
		}
	}, [navigate, userInfo, user, dispatch])

	//Search postal code screen ___________________________________
	useEffect(() => {
		if (autoAddress !== null && postalCode !== '') {
			setInputValue((prev) => ({
				...prev,
				prefecture: autoAddress.prefecture,
				address: autoAddress.address1 + autoAddress.address2,
			}))
		}
	}, [autoAddress, postalCode])

	const submitHandler = (e) => {
		dispatch({ type: USER_PROFILE_UPDATE_RESET })
		e.preventDefault()
		//Changing address___________________________________
		if (inputValue.address) {
			dispatch(
				userProfileUpdate({
					id: user._id,
					postalCode,
					prefecture,
					address,
					building,
				})
			)
			dispatch(getUserDetails('profile'))
			setInputValue(initialValue)
		}
	}
	return (
		<>
			<Container>
				<FormContainer onSubmit={submitHandler}>
					{(error || userUpdateError) && (
						<Message variant='danger'>
							{error || userUpdateError}
						</Message>
					)}
					{(loading || userUpdateLoading) && <Loader />}
					<Link
						to={`/profile`}
						onClick={() =>
							dispatch({ type: USER_PROFILE_UPDATE_RESET })
						}
					>
						<BackButton />
					</Link>
					{success && (
						<Message variant='info'>変更いたしました</Message>
					)}
					{user.homeAddress && (
						<>
							<h1 className='text-center'>住所の変更</h1>
							<div className='flex justify-between my-4'>
								<div>
									<p className='whitespace-nowrap font-bold text-sm text-gray-700 '>
										現住所:
									</p>
								</div>
								<div>
									{!IsObjectEmpty(user.homeAddress) ? (
										<>
											<p className='text-right'>
												〒{user.homeAddress.postalCode}
											</p>
											<p className='text-right'>
												{user.homeAddress.prefecture +
													user.homeAddress.address +
													user.homeAddress.building}
											</p>
										</>
									) : (
										<p>未登録</p>
									)}
								</div>
							</div>

							<div className='mb-1'>
								<InputField
									type='text'
									value={postalCode}
									placeholder='xxxxxxx'
									label='郵便番号'
									onChange={(e) =>
										setInputValue((prev) => ({
											...prev,
											postalCode: e.target.value,
										}))
									}
								/>
								<p className='text-sm text-right'>
									*自動で検索されます
								</p>
							</div>
							<div className='mb-4'>
								<label className='block text-gray-700 text-sm font-bold mb-2'>
									都道府県
								</label>
								<select
									id='data'
									name='gameTitle'
									value={prefecture}
									onChange={(e) =>
										setInputValue((prev) => ({
											...prev,
											prefecture: e.target.value,
										}))
									}
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
									value={address}
									placeholder='市区町村・番地'
									label='市区町村・番地'
									onChange={(e) =>
										setInputValue((prev) => ({
											...prev,
											address: e.target.value,
										}))
									}
								/>
							</div>
							<div className='mb-4'>
								<InputField
									type='text'
									value={building}
									placeholder='建物名・部屋番号'
									label='建物名・部屋番号'
									onChange={(e) =>
										setInputValue((prev) => ({
											...prev,
											building: e.target.value,
										}))
									}
									notRequired
								/>
							</div>
							<div className='flex items-center justify-between'>
								<Button
									disabled={loading || userUpdateLoading}
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
					)}
				</FormContainer>
			</Container>
		</>
	)
}

export default ChangeAddressScreen

