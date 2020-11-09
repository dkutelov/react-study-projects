import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import createHistory from 'history/createBrowserHistory'

import * as actions from '../actions'
import Header from './Header'
import Landing from './Landing'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import Dashboard from './Dashboard'
import SurveyNew from './surveys/SurveyNew'
import SurveyResults from './surveys/SurveyResults'

export const history = createHistory()

const Auth = () => (
	<div className="row">
		<RegisterForm />
		<LoginForm />
	</div>
)

class App extends Component {
	componentDidMount() {
		this.props.fetchUser()
	}
	render() {
		const currentPath = history.location.pathname
		// Separate users who click answer link and only can see survey results
		const seeResultsOnly = currentPath.includes('/results')

		return (
			<div className="container">
				<Router history={history}>
					<div>
						{!seeResultsOnly && <Header />}
						{!this.props.auth && !seeResultsOnly && <Auth />}
						<Route path="/" component={Landing} exact />
						<Route path="/surveys" component={Dashboard} exact />
						<Route path="/surveys/new" component={SurveyNew} />
						<Route path="/results/:surveyId" component={SurveyResults} />
					</div>
				</Router>
			</div>
		)
	}
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps, actions)(App)
