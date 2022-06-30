import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../components/common/Container'
import FormContainer from '../components/common/FormContainer'
import BackButton from '../components/common/BackButton'
import Message from '../components/common/Message'
import Loader from '../components/common/Loader'
import { listMyEvaluations } from '../redux/actions/evaluationActions'
import moment from 'moment'

const MyEvaluatedScreen = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { id, _id } = useParams()
	const { userInfo } = useSelector((state) => state.userLogin)
	const { evaluation, loading, error } = useSelector(
		(state) => state.evaluationMyLists
	)

	const filteredEvaluation =
		evaluation &&
		evaluation.evaluations &&
		evaluation.evaluations.filter((obj) => obj._id === _id)[0]

	useEffect(() => {
		if (!userInfo) {
			navigate('/login')
		}
		dispatch(listMyEvaluations(id))
	}, [dispatch, navigate, userInfo, id])

	return (
		<Container>
			<FormContainer>
				<Link to={`/profile/evaluations/${id}`}>
					<BackButton />
				</Link>
				{error && <Message variant='danger'>{error}</Message>}
				{loading && <Loader />}
				<h1 className='text-center'>
					{filteredEvaluation &&
						moment(filteredEvaluation.createdAt).format('YYYY年M')}
					月の評価
				</h1>
				{filteredEvaluation && (
					<>
						<div>
							会話力:
							{filteredEvaluation.conversation}
						</div>
						<div>
							努力値:
							{filteredEvaluation.effort}
						</div>
						<div>
							集中力:
							{filteredEvaluation.concentration}
						</div>
						<div>
							発言力:
							{filteredEvaluation.speaking}
						</div>
						<div>
							xx月の総合評価:
							{filteredEvaluation.overall}
						</div>
						<div>
							コメント:
							{filteredEvaluation.comment}
						</div>
					</>
				)}
			</FormContainer>
		</Container>
	)
}

export default MyEvaluatedScreen

