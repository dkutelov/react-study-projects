import React from 'react'
import { NavLink } from 'react-router-dom'

export const HeaderTest = () => (
	<header>
		<h1>Expensify</h1>
		<NavLink to="/dashboard" activeClassName="is-active">
			Dashboard
		</NavLink>
		<NavLink to="/create" activeClassName="is-active">
			Create Expense
		</NavLink>
	</header>
)

export default HeaderTest
