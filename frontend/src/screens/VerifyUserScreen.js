import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { verifyUser } from '../redux/actions/userActions'

const VerifyUserScreen = ({ match, history }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { id, token } = useParams()

	// const cart = useSelector((state) => state.cart)
	// const { cartItems } = cart

	// const userVerify = useSelector((state) => state.userVerify)
	// const { success } = userVerify

	const success = false

	useEffect(() => {
		if (!success) {
			dispatch(verifyUser(id, token))
			console.log(id, token)
			navigate('/login')
		}
	}, [success, dispatch, navigate, id, token]) // eslint-disable-line react-hooks/exhaustive-deps
	return null
}

export default VerifyUserScreen
