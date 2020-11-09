import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import { SIGN_IN } from '../../queries'
import Error from '../Error'

const initialState = {
	username : '',
	password : ''
}
class Signin extends Component {
	state = { ...initialState }

	handleChange = (event) => {
		const { name, value } = event.target
		this.setState({ [name]: value })
	}

	clearState = () => {
		this.setState({ ...initialState })
	}

	handleSubmit = async (event, signinUser) => {
		event.preventDefault()
		try {
			const { data } = await signinUser()
			localStorage.setItem('token', data.signinUser.token)
			await this.props.refetch()
			this.clearState()
			this.props.history.push('/')
		} catch (err) {
			console.log(err)
			this.clearState()
		}
	}

	validateForm = () => {
		const { username, password } = this.state
		const isValid = !username || !password
		return isValid
	}

	render () {
		const { username, password } = this.state
		return (
			<div className="App">
				<h2>Sign In</h2>
				<Mutation mutation={SIGN_IN} variables={{ username, password }}>
					{(signinUser, { data, loading, error }) => {
						return (
							<form className="form" onSubmit={(event) => this.handleSubmit(event, signinUser)}>
								<input
									type="text"
									name="username"
									placeholder="Username"
									onChange={this.handleChange}
									value={username}
								/>
								<input
									type="password"
									name="password"
									placeholder="Password"
									onChange={this.handleChange}
									value={password}
								/>
								<button
									disabled={loading || this.validateForm()}
									type="submit"
									className="button-primary">
									Sing In
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

export default withRouter(Signin)
