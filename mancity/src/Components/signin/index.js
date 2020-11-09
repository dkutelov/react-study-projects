import React, { Component } from 'react'
import { firebase } from '../../firebase'
import FormField from '../utils/FormFields'
import { validate } from '../utils/Misc'

export class SignIn extends Component {
	state = {
		formError   : false,
		formSuccess : '',
		formData    : {
			email    : {
				element           : 'input',
				value             : '',
				config            : {
					name        : 'email_input',
					type        : 'email',
					placeholder : 'Enter you email'
				},
				validation        : {
					required : true,
					email    : true
				},
				valid             : false,
				validationMessage : ''
			},
			password : {
				element           : 'input',
				value             : '',
				config            : {
					name        : 'password_input',
					type        : 'password',
					placeholder : 'Enter you password'
				},
				validation        : {
					required : true
				},
				valid             : false,
				validationMessage : ''
			}
		}
	}

	submitForm (event) {
		event.preventDefault()
		let dataToSubmit = {}
		let formIsFalid = true

		Object.keys(this.state.formData).forEach((key) => {
			dataToSubmit[key] = this.state.formData[key].value
			formIsFalid = this.state.formData[key].valid && formIsFalid
		})

		if (formIsFalid) {
			//Check is user is authenticated
			firebase
				.auth()
				.signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
				.then(() => {
					this.props.history.push('/dashboard')
				})
				.catch(() => this.setState({ formError: true }))
		}
		else {
			this.setState({ formError: true })
		}
	}
	updateForm (element) {
		const newFormData = { ...this.state.formData }
		const newElement = { ...newFormData[element.id] }
		newElement.value = element.event.target.value
		let validData = validate(newElement)
		newElement.valid = validData[0]
		newElement.validationMessage = validData[1]
		newFormData[element.id] = newElement
		this.setState({
			formError : false,
			formData  : newFormData
		})
	}
	render () {
		return (
			<div className="container">
				<div className="signin_wrapper" style={{ margin: '100px' }}>
					<form onSubmit={(event) => this.submitForm(event)}>
						<h2>Please, log in!</h2>
						<FormField
							id="email"
							formData={this.state.formData.email}
							change={(element) => this.updateForm(element)}
						/>
						<FormField
							id="password"
							formData={this.state.formData.password}
							change={(element) => this.updateForm(element)}
						/>
						{this.state.formError && <div className="error_label">Something went wrong!</div>}
						<div className="success_label">{this.state.formSuccess}</div>
						<button type="submit">Login</button>
					</form>
				</div>
			</div>
		)
	}
}

export default SignIn
