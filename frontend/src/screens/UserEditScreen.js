import React, { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'
import Message from '../components/common/Message'
import { useDispatch, useSelector } from 'react-redux'
import HorizontalButton from '../components/common/HorizontalButton'
import { getUserDetails } from '../redux/actions/userActions'

import Loader from '../components/common/Loader'
import BackButton from '../components/common/BackButton'
import IsObjectEmpty from '../components/common/IsObjectEmpty'

const UserEditScreen = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { id } = useParams()

	const userDetails = useSelector((state) => state.userDetails)
	const { user, loading, error } = userDetails

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	useEffect(() => {
		if (!userInfo) {
			navigate('/login')
		} else {
			if (IsObjectEmpty(user)) {
				dispatch(getUserDetails(id))
			}
		}
	}, [user, dispatch, id, navigate, userInfo])

	return (
		<Container>
			<FormContainer>
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<>
						<BackButton
							onClick={(e) => {
								e.preventDefault()
								navigate('/admin/userlist')
							}}
						/>
						{user && user.userData && user.userData.name && (
							<>
								<p>
									{user.userData.name.lastName +
										' ' +
										user.userData.name.firstName}
									様の設定
								</p>
								<Link to={`/admin/${id}/edit/status`}>
									<HorizontalButton
										text='マッチステイタス変更 :'
										type='button'
										// setState={() => setComponent('match')}
										result={
											user.room.isActive
												? 'アクティブ'
												: '未定'
										}
									/>
								</Link>
							</>
						)}
					</>
				)}
			</FormContainer>
		</Container>
	)
}

export default UserEditScreen

