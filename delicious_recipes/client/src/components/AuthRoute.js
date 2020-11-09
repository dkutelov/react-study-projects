import React from 'react'

import { Query } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import { GET_CURRENT_USER } from '../queries'

const AuthRoute = ({ children }) => (
	<Query query={GET_CURRENT_USER}>
		{({ data, loading }) => {
			if (loading) return null
			//console.log(data)
			const authenticated = true
			return authenticated ? { children } : <Redirect to="/" />
		}}
	</Query>
)

export default AuthRoute
