import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers } from '../redux/actions/userActions'
import Loader from '../components/common/Loader'
import Message from '../components/common/Message'
import { Link, useNavigate } from 'react-router-dom'
import { USER_DETAILS_RESET } from '../redux/constants/userConstants'

const UserListScreen = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const userList = useSelector((state) => state.userList)
	const { loading, error, users } = userList

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch({ type: USER_DETAILS_RESET })
			dispatch(listUsers())
		} else {
			navigate('/login')
		}
	}, [dispatch, navigate, userInfo])

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<div>
					<table>
						<thead>
							<tr>
								{/* <th>ID</th> */}
								<th>氏名</th>
								<th>EMAIL</th>
								<th>Type</th>
								<th>Edit</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr key={user._id}>
									{/* <td>{user._id}</td> */}
									<td>
										{user.name.lastName +
											' ' +
											user.name.firstName}
									</td>
									<td>{user.email}</td>
									<td>
										{user.isAdmin
											? 'admin'
											: user.isTeacher
											? 'teacher'
											: 'user'}
									</td>
									<td>
										<Link to={`/admin/${user._id}/edit`}>
											<button>edit</button>
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</>
	)
}

export default UserListScreen
