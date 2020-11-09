import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'

import { fetchSurveys } from '../../actions'
import SurveyField from './SurveyField'
import SaveDraftButton from './SaveDraftButton'
import validateEmails from '../../utils/validateEmails'
import emailsToString from '../../utils/emailsToString'
import formFields from './formFields'

class SurveyForm extends Component {
	componentDidMount() {
		this.props.fetchSurveys()
	}

	renderFields() {
		return formFields.map(({ label, name }) => (
			<Field
				key={name}
				label={label}
				type="text"
				name={name}
				component={SurveyField}
			/>
		))
	}

	// if draft exists sets form fields values
	render() {
		return (
			<div>
				<form
					onSubmit={this.props.handleSubmit(this.props.toggleShowSurveyReview)}>
					{this.renderFields()}
					<Link to="/surveys" className="red btn-flat white-text">
						Cancel
					</Link>
					<SaveDraftButton />
					<button type="submit" className="teal btn-flat right white-text">
						Next
						<i className="material-icons right">done</i>
					</button>
				</form>
			</div>
		)
	}
}

function validate(values) {
	const errors = {}

	errors.recipients = validateEmails(values.recipients || '')

	formFields.forEach(({ name, noValError }) => {
		if (!values[name]) {
			errors[name] = noValError
		}
	})

	// Else make field optional, if entered value validates as email
	if (values.emailfrom) {
		errors.emailfrom = validateEmails(values.emailfrom || '')
	} else {
		errors.emailfrom = ''
	}

	return errors
}

function mapStateToProps(state) {
	let initialValues
	if (state.surveys.length > 0) {
		// Filter draft survey data if exist
		const draftSurvey = state.surveys.filter(survey => !survey.isSent)
		// Prevent error if no draft survey data
		if (draftSurvey.length > 0) {
			// Convert array to object for synthax reason
			const draftSurveyObj = draftSurvey[0]
			// De-structure and convert back recipients to string
			const { title, subject, emailfrom, body } = draftSurveyObj
			const recipients = emailsToString(draftSurvey[0]['recipients'])
			// Set initial values object
			initialValues = { title, subject, emailfrom, body, recipients }
		}
	}

	return {
		initialValues
	}
}

SurveyForm = reduxForm({
	validate,
	form: 'surveyForm',
	destroyOnUnmount: false,
	enableReinitialize: true
})(SurveyForm)

SurveyForm = connect(mapStateToProps, { fetchSurveys })(SurveyForm)

export default SurveyForm
