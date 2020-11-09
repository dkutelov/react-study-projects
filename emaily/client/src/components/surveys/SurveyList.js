import React, { Component } from 'react'
import { connect } from 'react-redux'

import Chart from './Chart'
//import axios from 'axios'
import _ from 'lodash'

import { fetchSurveys, deleteSurvey } from '../../actions'

//import testing from '../../utils/testing'
//testing()

class SurveyList extends Component {
	componentDidMount() {
		this.props.fetchSurveys()
	}

	// async deleteSurvey(surveyId) {
	// 	await axios.post('/api/surveys/delete', { surveyId })
	// 	this.props.fetchSurveys()
	// }

	renderSurveys() {
		// filter to exclude drafts
		// sort the surveys - sortOrder prop
		let surveys = _.filter(this.props.surveys, { isSent: true })
		surveys = _.sortBy(surveys, ['dateSent'])
		if (this.props.sortOrder) {
			surveys = _.reverse(surveys)
		}
		// generate HTML
		return surveys.map(survey => {
			return (
				<div className="card lime lighten-5" key={survey._id}>
					<div className="row" style={{ marginBottom: '0' }}>
						<div
							className="col s8"
							style={{ paddingLeft: '36px', paddingTop: '16px' }}>
							<span className="card-title" style={{ fontSize: '32px' }}>
								{survey.title}
							</span>
							<p>Question: {survey.body}</p>
							<p>Sent on: {new Date(survey.dateSent).toLocaleDateString()}</p>
							<p style={{ marginTop: '35px', marginBottom: '5px' }}>
								Number of answers: {survey.yes + survey.no} (Yes: {survey.yes},
								No: {survey.no})
							</p>
							<p style={{ marginTop: '0' }}>
								Last response on:
								{survey.lastResponded
									? new Date(survey.lastResponded).toLocaleDateString()
									: ' No responses'}
							</p>
						</div>
						<div className="col s4" style={{ textAlign: 'center' }}>
							{survey.yes || survey.no ? (
								<Chart
									myData={[
										{ angle: survey.yes, label: 'Yes', color: '2' },
										{ angle: survey.no, label: 'No', color: 'a' }
									]}
								/>
							) : (
								<p>No data yet.</p>
							)}
						</div>
					</div>
					<div className="card-action">
						<button
							onClick={() => {
								this.props.deleteSurvey(survey._id)
							}}
							className="red btn-flat white-text"
							style={{ marginTop: '-1px' }}>
							Delete
						</button>
					</div>
				</div>
			)
		})
	}
	render() {
		return <div>{this.renderSurveys()}</div>
	}
}

const mapStateToProps = ({ surveys }) => ({ surveys })

export default connect(mapStateToProps, { fetchSurveys, deleteSurvey })(
	SurveyList
)
