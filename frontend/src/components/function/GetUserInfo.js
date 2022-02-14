import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const GetUserInfo = () => {
	const userLogin = useSelector((state) => state.userLogin)
	const { loading, userInfo, error } = userLogin

	return { loading, userInfo, error }
}

export default GetUserInfo
