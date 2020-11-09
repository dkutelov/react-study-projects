import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'

import FormField from '../../utils/FormFields'
import { validate } from '../../utils/Misc'
import { databasePromotions } from '../../../firebase'

class Enroll extends Component {
	state = {
		formError   : false,
		formSuccess : '',
		formData    : {
			email : {
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
			//Check is email is already existing
			databasePromotions.orderByChild('email').equalTo(dataToSubmit.email).once('value').then((snapshot) => {
				// if email does not exist in the DB, snapshot.val() is null
				if (!snapshot.val()) {
					databasePromotions.push(dataToSubmit)
					this.resetFormSuccess(true)
				}
				else {
					this.resetFormSuccess(false)
				}
			})
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

	resetFormSuccess (type) {
		const newFormData = { ...this.state.formData }

		for (let key in newFormData) {
			newFormData[key].value = ''
			newFormData[key].valid = false
			newFormData[key].validationMessage = ''
			this.setState({
				formError   : false,
				formData    : newFormData,
				formSuccess : type
					? 'Your email was successfully added to our list!'
					: 'Your email is already on our list!'
			})
			this.clearSuccessMessage()
		}
	}

	clearSuccessMessage () {
		setTimeout(() => {
			this.setState({ formSuccess: '' })
		}, 2000)
	}

	render () {
		return (
			<Fade>
				<div className="enroll_wrapper">
					<form onSubmit={(event) => this.submitForm(event)}>
						<div className="enroll_title">Enter your email</div>
						<div className="enroll_input">
							<FormField
								id="email"
								formData={this.state.formData.email}
								change={(element) => this.updateForm(element)}
							/>
							{this.state.formError && <div className="error_label">Something went wrong!</div>}
							<div className="success_label">{this.state.formSuccess}</div>
							<button type="submit">Enroll</button>
							<div className="enroll_discl">
								Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing
								industries for previewing layouts and visual mockups.
							</div>
						</div>
					</form>
				</div>
			</Fade>
		)
	}
}

export default Enroll
