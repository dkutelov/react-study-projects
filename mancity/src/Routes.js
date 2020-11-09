import React from 'react'
import Layout from './Hoc/Layout'
import { Switch } from 'react-router-dom'

import Home from './Components/home'
import SignIn from './Components/signin'
import Dashboard from './Components/admin/Dashboard'
import AdminMatches from './Components/admin/matches'
import PrivateRoute from './Components/authRoutes/PrivateRoute'
import PublicRoute from './Components/authRoutes/PublicRoute'
import AddEditMatch from './Components/admin/matches/AddEditMatch.jsx'

const Routes = (props) => {
	return (
		<Layout>
			<Switch>
				<PublicRoute {...props} restricted={false} path="/" exact component={Home} />
				<PublicRoute {...props} restricted={true} path="/sign_in" exact component={SignIn} />
				<PrivateRoute {...props} path="/dashboard" component={Dashboard} exact />
				<PrivateRoute {...props} path="/admin_matches/add_match" component={AddEditMatch} exact />
				<PrivateRoute {...props} path="/admin_matches/edit_match/:id" component={AddEditMatch} exact />
				<PrivateRoute {...props} path="/admin_matches" component={AdminMatches} exact />
			</Switch>
		</Layout>
	)
}

export default Routes
