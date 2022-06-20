import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { verifyUser } from '../redux/actions/userActions'
import Loader from '../components/common/Loader'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'

const VerifyUserScreen = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { id, token } = useParams()

	const userVerify = useSelector((state) => state.userVerify)
	const { success, error } = userVerify

	useEffect(() => {
		if (!success) {
			dispatch(verifyUser(id, token))
			console.log(id, token)
		}
		if (success) navigate('/login')
	}, [success, dispatch, navigate, id, token]) // eslint-disable-line react-hooks/exhaustive-deps
	return (
		<>
			<Container>
				<FormContainer>
					{!success || !error ? (
						<>
							<h1 className='text-center'>
								メールアドレスの確認中です...
							</h1>
							<Loader />
						</>
					) : (
						<div>エラー: {error}</div>
					)}
				</FormContainer>
			</Container>
		</>
	)
}

export default VerifyUserScreen

