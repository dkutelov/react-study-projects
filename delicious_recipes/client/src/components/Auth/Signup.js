import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import { SIGN_UP } from '../../queries'
import Error from '../Error'

const initialState = {
	username             : '',
	email                : '',
	password             : '',
	passwordConfirmation : ''
}
class Signup extends Component {
	state = { ...initialState }

	handleChange = (event) => {
		const { name, value } = event.target
		this.setState({ [name]: value })
	}

	clearState = () => {
		this.setState({ ...initialState })
	}

	handleSubmit = async (event, signupUser) => {
		event.preventDefault()
		try {
			const { data } = await signupUser()
			localStorage.setItem('token', data.signupUser.token)
			await this.props.refetch()
			this.clearState()
			this.props.history.push('/')
		} catch (err) {
			console.log(err)
			this.clearState()
		}
	}

	validateForm = () => {
		const { username, email, password, passwordConfirmation } = this.state
		const isValid = !username || !email || !password || password !== passwordConfirmation
		return isValid
	}

	render () {
		const { username, email, password, passwordConfirmation } = this.state
		return (
			<div className="App">
				<h2>Sign Up</h2>
				<Mutation mutation={SIGN_UP} variables={{ username, email, password }}>
					{(signupUser, { data, loading, error }) => {
						return (
							<form className="form" onSubmit={(event) => this.handleSubmit(event, signupUser)}>
								<input
									type="text"
									name="username"
									placeholder="Username"
									onChange={this.handleChange}
									value={username}
								/>
								<input
									type="email"
									name="email"
									placeholder="Email"
									onChange={this.handleChange}
									value={email}
								/>
								<input
									type="password"
									name="password"
									placeholder="Password"
									onChange={this.handleChange}
									value={password}
								/>
								<input
									type="password"
									name="passwordConfirmation"
									placeholder="Confirm password"
									onChange={this.handleChange}
									value={passwordConfirmation}
								/>
								<button
									disabled={loading || this.validateForm()}
									type="submit"
									className="button-primary">
									Sign up
								</button>
								{error && <Error error={error} />}
							</form>
						)
					}}
				</Mutation>
			</div>
		)
	}
}

export default withRouter(Signup)
