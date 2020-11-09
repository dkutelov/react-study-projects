import React, { Component } from 'react'
import { connect } from 'react-redux'

//import Chart from './Chart'

import { fetchSurvey } from '../../actions'

class SurveyResults extends Component {
	componentDidMount() {
		const surveyId = { surveyId: this.props.match.params.surveyId }
		this.props.fetchSurvey(surveyId)
	}

	render() {
		const { body, yes, no } = this.props.survey
		const yesPercent = yes / (yes + no) * 100
		const noPercent = no / (yes + no) * 100
		return (
			<div className="container">
				<h4 className="center-align">Благодарим Ви, че отговорихте!</h4>
				<br />
				<div className="row">
					<div className="col s12 m2" />
					<div className="col s12 m8">
						<div className="card-panel teal">
							<span className="white-text">Въпрос: {body}</span>
						</div>
					</div>
				</div>
				<h5 className="center-align">Към момента отговорите са:</h5>
				<br />
				<div className="row">
					<div className="col s12 m4" />
					<div className="col s6 m2">
						<div className="center">
							<i className="material-icons yes">sentiment_very_satisfied</i>
							<p>{yesPercent.toFixed(0)} %</p>
						</div>
					</div>
					<div className="col s6 m2">
						<div className="center">
							<i className="material-icons no">sentiment_very_dissatisfied</i>
							<p>{noPercent.toFixed(0)} %</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ survey }) => ({ survey })

export default connect(mapStateToProps, { fetchSurvey })(SurveyResults)

// <div className="row">
// 	<div className="col s12 m2" />
// 	<div className="col s12 m8">
// 		<Chart
// 			myData={[
// 				{ angle: yes, label: 'Да', color: '2' },
// 				{ angle: no, label: 'Не', color: 'a' }
// 			]}
// 		/>
// 	</div>
// </div>
