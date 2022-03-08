import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'
import Message from '../components/common/Message'
import HorizontalButton from '../components/common/HorizontalButton'
import Loader from '../components/common/Loader'
import Calender from '../components/Calender'
import { useDispatch, useSelector } from 'react-redux'
import { getTeacherDetails, getUserDetails } from '../redux/actions/userActions'

import IsObjectEmpty from '../components/common/IsObjectEmpty'

const ProfileScreen = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const userDetails = useSelector((state) => state.userDetails)
	const { loading, user, error } = userDetails
	const userTeacherDetails = useSelector((state) => state.userTeacherDetails)
	const { teacher } = userTeacherDetails
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	useEffect(() => {
		if (!userInfo) {
			navigate('/login')
		} else {
			if (IsObjectEmpty(user)) {
				dispatch(getUserDetails('profile'))
				if (user.teacher) dispatch(getTeacherDetails(user.teacher))
			}
		}
	}, [navigate, userInfo, user, dispatch])

	return (
		<Container>
			<FormContainer>
				{error && <Message variant='danger'>{error}</Message>}
				{loading && <Loader />}
				{user && user.info && user.name && user.homeAddress && (
					<>
						<h1>プロファイル</h1>
						{!user.isTeacher && <Calender />}
						<p className='mt-4'>ユーザー情報</p>
						<HorizontalButton
							text='お名前:'
							type='box'
							result={
								user.name.lastName + ' ' + user.name.firstName
							}
						/>
						<HorizontalButton
							text='メールアドレス:'
							type='box'
							result={user.email}
						/>
						<HorizontalButton
							text='Discordアカウント:'
							type='box'
							result={user.info.discordId}
						/>
						<HorizontalButton
							text='受講日:'
							type='box'
							result='データーモデルに追加'
						/>
						<HorizontalButton
							text='アカウント:'
							type='box'
							result={user.isTeacher ? 'Teacher' : 'Learner'}
						/>
						{/* <HorizontalButton
								text='ご使用ゲーム:'
								type='box'
								result={user.info.gameTitle}
							/> */}
						<p className='mt-4'>一般</p>
						<Link to={`/profile/address`}>
							<HorizontalButton
								text='住所登録'
								type='button'
								result={
									IsObjectEmpty(user.homeAddress)
										? '未登録'
										: '登録済み'
								}
							/>
						</Link>
						<HorizontalButton
							text='お支払いプラン'
							type='button'
							result='定額'
						/>
						{!user.isTeacher && (
							<HorizontalButton
								text='先生'
								type='button'
								result={
									user.teacher
										? teacher.name.kanaFirstName + '先生'
										: '未定'
								}
							/>
						)}
						<p className='mt-4'>設定</p>
						<Link to={`/profile/payment/history`}>
							<HorizontalButton
								text='月額支払い設定'
								type='button'
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
					</>
				)}
			</FormContainer>
		</Container>
	)
}

export default ProfileScreen
