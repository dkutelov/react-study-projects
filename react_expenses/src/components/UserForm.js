import React, { Component } from 'react'

export default class UserForm extends Component {
	state = {
		email: '',
		password: ''
	}

	onEmailChange = e => {
		const email = e.target.value
		this.setState(() => ({ email }))
	}

	onPasswordChange = e => {
		const password = e.target.value
		this.setState(() => ({ password }))
	}

	onFormSubmit = e => {
		e.preventDefault()
		this.props.onSubmit({
			email: this.state.email,
			password: this.state.password
		})
	}

	render() {
		return (
			<form onSubmit={this.onFormSubmit} className="login-form">
				<div className="login-form__input">
					<label>User name</label>
					<input
						type="email"
						placeholder="email"
						value={this.state.email}
						onChange={this.onEmailChange}
					/>
				</div>
				<div className="login-form__input">
					<label>Pasword</label>
					<input
						type="password"
						placeholder="password"
						value={this.state.password}
						onChange={this.onPasswordChange}
					/>
				</div>
				<div className="login-form__submit">
					<input
						className="button button--user-login"
						type="submit"
						value="Submit"
					/>
				</div>
			</form>
		)
	}
}
