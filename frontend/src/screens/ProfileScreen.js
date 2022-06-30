import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'
import Message from '../components/common/Message'
import HorizontalButton from '../components/common/HorizontalButton'
import IsObjectEmpty from '../components/common/IsObjectEmpty'
import Loader from '../components/common/Loader'
import Calender from '../components/Calender'

import classnames from 'classnames'

import { useDispatch, useSelector } from 'react-redux'
import { getTeacherDetails, getUserDetails } from '../redux/actions/userActions'

const ProfileScreen = () => {
	const [startAnimate, setStartAnimate] = useState(false)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { loading, user, error } = useSelector((state) => state.userDetails)

	const { teacher } = useSelector((state) => state.userTeacherDetails)

	const { userInfo } = useSelector((state) => state.userLogin)

	const userData = useSelector((state) => state.userDetails)
	console.log(userData)

	useEffect(() => {
		if (!userInfo) {
			navigate('/login')
		} else {
			if (IsObjectEmpty(user) && user) {
				dispatch(getUserDetails('profile'))
				// setTimeout(() => setStartAnimate(true), 400)
				if (user.teacher) dispatch(getTeacherDetails(user.teacher))
			} else {
				setTimeout(() => setStartAnimate(true), 400)
			}
		}
		return () => setStartAnimate()
	}, [navigate, userInfo, user, dispatch])

	const animationClass = classnames(
		`transition-transform duration-200 ease-in-out scale-y-0 origin-top`,
		{
			'scale-y-100': startAnimate,
		}
	)

	return (
		<Container>
			<FormContainer>
				{error && <Message variant='danger'>{error}</Message>}
				<h1>プロファイル</h1>
				{(loading || !startAnimate) && <Loader />}
				{/* {!loading && (
					<> */}
				<div className={animationClass}>
					{user?.userType === 'customer' && <Calender />}
					<p className='mt-4'>ユーザー情報</p>
					<HorizontalButton
						text='お名前:'
						type='box'
						result={
							user.name?.lastName + ' ' + user.name?.firstName
						}
					/>
					<HorizontalButton
						text='メールアドレス:'
						type='box'
						result={user?.email}
					/>
					<HorizontalButton
						text='Discordアカウント:'
						type='box'
						result={user.info?.discordId}
					/>
					<HorizontalButton
						text='受講日:'
						type='box'
						result='データーモデルに追加'
					/>
					<HorizontalButton
						text='アカウント:'
						type='box'
						result={user?.userType === 'customer' ? '生徒' : '先生'}
					/>

					<p className='mt-4'>一般</p>
					<Link to={`/profile/address`}>
						<HorizontalButton
							text='住所登録'
							type='button'
							result={
								IsObjectEmpty(user?.homeAddress)
									? '未登録'
									: '登録済み'
							}
						/>
					</Link>

					{user?.userType === 'customer' && (
						// <HorizontalButton
						// 	text='先生'
						// 	type='button'
						// 	result={
						// 		user?.teacher
						// 			? teacher.name?.kanaFirstName + '先生'
						// 			: '未定'
						// 	}
						// />
						<Link to={`/profile/evaluations/${userInfo._id}`}>
							<HorizontalButton text='評価' type='button' />
						</Link>
					)}
					{user?.userType === 'employee' && (
						<Link to={`/teacher/students`}>
							<HorizontalButton text='生徒一覧' type='button' />
						</Link>
					)}
					<p className='mt-4'>設定</p>

					<Link to={`/profile/payment`}>
						<HorizontalButton text='月額支払い設定' type='button' />
					</Link>
					<Link to={`/profile/payment/history`}>
						<HorizontalButton
							text='お支払いプラン'
							type='button'
							result='定額'
						/>
					</Link>
					<Link to={'/profile/password'}>
						<HorizontalButton
							text='パスワードの変更'
							type='button'
						/>
					</Link>
					<Link to={'/profile/discordId'}>
						<HorizontalButton
							text='Discordの名前変更'
							type='button'
						/>
					</Link>
				</div>
				{/* </>
				)} */}
			</FormContainer>
		</Container>
	)
}

export default ProfileScreen

