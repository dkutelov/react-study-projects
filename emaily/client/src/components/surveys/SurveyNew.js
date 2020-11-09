import React, { Component } from 'react'

import { reduxForm } from 'redux-form'

import SurveyForm from './SurveyForm'
import SurveyFormReview from './SurveyFormReview'

class SurveyNew extends Component {
	state = {
		showSurveyReview: false
	}

	toggleShowSurveyReview = () => {
		this.setState(prevState => ({
			showSurveyReview: !prevState.showSurveyReview
		}))
	}

	render() {
		return (
			<div>
				{!this.state.showSurveyReview ? (
					<SurveyForm toggleShowSurveyReview={this.toggleShowSurveyReview} />
				) : (
					<SurveyFormReview
						toggleShowSurveyReview={this.toggleShowSurveyReview}
					/>
				)}
			</div>
		)
	}
}

export default reduxForm({
	form: 'surveyForm'
})(SurveyNew)
