import classNames from 'classnames'
import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'
import { listWaitLists } from '../redux/actions/userActions'
import { USER_WAIT_LISTS_RESET } from '../redux/constants/userConstants'
import BackButton from '../components/common/BackButton'

const WaitListScreen = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { students, success } = useSelector((state) => state.userWaitLists)
	console.log(students)

	const filteredStudent =
		students && students.filter((student) => student._id === id)[0]
	console.log(filteredStudent)

	useEffect(() => {
		if (students && students.length === 0 && !success) {
			dispatch({ type: USER_WAIT_LISTS_RESET })
			dispatch(listWaitLists())
		} else {
			console.log('done fetching students')
		}
	}, [dispatch, success, students])

	return (
		<Container>
			<FormContainer>
				<BackButton
					onClick={(e) => {
						e.preventDefault()
						navigate('/teacher/waitList')
					}}
				/>
				{filteredStudent && <div>{filteredStudent._id}</div>}
			</FormContainer>
		</Container>
	)
}

export default WaitListScreen
