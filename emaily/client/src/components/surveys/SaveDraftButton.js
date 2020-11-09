import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { submitSurvey } from '../../actions'
//import getValuesWithId from '../../utils/getValuesWithId'
// add survey id to values

class SaveDraftButton extends Component {
	getValuesWithId() {
		// add draft survey id to the values object
		const draftSurvey = this.props.surveys.filter(survey => !survey.isSent)

		if (draftSurvey.length === 0) {
			const values = this.props.values
			return values
		}

		if (draftSurvey && draftSurvey.length > 0) {
			const draftSurveyId = draftSurvey[0]['_id']

			const values = this.props.values
			values.id = draftSurveyId

			return values
		}
	}
	render() {
		return (
			<div
				className="yellow btn-flat"
				onClick={() => {
					this.props.submitSurvey(this.getValuesWithId(), this.props.history)
					alert('Darft Saved!')
				}}>
				Save as draft
			</div>
		)
	}
}
const mapStateToProps = ({ form: { surveyForm }, surveys }) => {
	return {
		values: surveyForm.values,
		surveys
	}
}

export default connect(mapStateToProps, { submitSurvey })(
	withRouter(SaveDraftButton)
)
