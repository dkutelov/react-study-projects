import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import _ from 'lodash'

import formFields from './formFields'
import * as actions from '../../actions'

const SurveyFormReview = ({
	toggleShowSurveyReview,
	values,
	surveys,
	submitSurvey,
	history
}) => {
	const reviewFields = _.map(formFields, ({ name, label }) => {
		return (
			<div key={name}>
				<label>{label}</label>
				<div>{values[name]}</div>
			</div>
		)
	})

	values.isSent = true
	const getValuesWithId = () => {
		// add draft survey id to the values object
		const draftSurvey = surveys.filter(survey => !survey.isSent)

		if (draftSurvey.length === 0) {
			return values
		}

		if (draftSurvey && draftSurvey.length > 0) {
			const draftSurveyId = draftSurvey[0]['_id']
			values.id = draftSurveyId

			return values
		}
	}

	return (
		<div>
			<h5>Please, review carefully your data</h5>
			<div>{reviewFields}</div>
			<button
				onClick={toggleShowSurveyReview}
				className="yellow darken-3 white-text btn-flat">
				<i className="material-icons left">arrow_back</i>
				Back
			</button>
			<button
				className="green btn-flat white-text right"
				onClick={() => {
					getValuesWithId()
					submitSurvey(values, history)
				}}>
				Send Survey
				<i className="material-icons right">email</i>
			</button>
		</div>
	)
}

const mapStateToProps = ({ form: { surveyForm }, surveys }) => {
	return {
		values: surveyForm.values,
		surveys
	}
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview))
