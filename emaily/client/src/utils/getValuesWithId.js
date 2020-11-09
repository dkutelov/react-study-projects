// Adds draft survey id to the values object
export default (surveys, values) => {
	const draftSurvey = surveys.filter(survey => !survey.isSent)

	if (draftSurvey.length === 0) {
		return values
	}

	if (draftSurvey && draftSurvey.length > 0) {
		const draftSurveyId = draftSurvey[0]['_id']

		values['id'] = draftSurveyId
		return values
	}
}
