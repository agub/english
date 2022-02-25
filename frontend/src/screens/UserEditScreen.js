import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'
import InputField from '../components/common/InputField'
import Message from '../components/common/Message'
import { useDispatch, useSelector } from 'react-redux'
import HorizontalButton from '../components/common/HorizontalButton'
import { getUserDetails, userProfileUpdate } from '../redux/actions/userActions'
import ChangeMatchStatus from '../components/ChangeMatchStatus'

const UserEditScreen = () => {
	const dispatch = useDispatch()
	const { id } = useParams()
	const [inputValue, setInputValue] = useState({
		hasMatched: false,
	})

	const [component, setComponent] = useState('')

	const [errorText, setErrorText] = useState(null)

	const { hasMatched } = inputValue

	const userRegister = useSelector((state) => state.userRegister)
	const { loading, success, error } = userRegister

	const userDetails = useSelector((state) => state.userDetails)
	const { user } = userDetails

	const submitHandler = (e) => {
		e.preventDefault()
		setErrorText(null)

		// dispatch(register(inputValue))
		setErrorText('パスワードと確認パスワードが一致しません')
	}

	useEffect(() => {
		if (
			user &&
			Object.keys(user).length === 0 &&
			Object.getPrototypeOf(user) === Object.prototype
		) {
			dispatch(getUserDetails(id))
		} else {
			console.log('user found')
		}
	}, [user, dispatch, id])

	return (
		<Container>
			<FormContainer onSubmit={submitHandler}>
				{component === '' && (
					<>
						{user && user.name && (
							<p>
								{user.name.firstName + user.name.lastName}
								様の設定
							</p>
						)}
						<HorizontalButton
							text='マッチステイタス変更 :'
							type='button'
							setState={() => setComponent('match')}
							result='fetch'
						/>
					</>
				)}

				{component === 'match' && (
					<ChangeMatchStatus component={() => setComponent('')} />
				)}
			</FormContainer>
		</Container>
	)
}

export default UserEditScreen
