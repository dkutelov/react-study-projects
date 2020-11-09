import React, { Component } from 'react'

import AdminLayout from '../../../Hoc/AdminLayout'
import FormField from '../../utils/FormFields'
import { validate } from '../../utils/Misc'
import { databaseTeams, database } from '../../../firebase'
import { firebaseLooper } from '../../utils/Misc'

class AddEditMatch extends Component {
	state = {
		matchId     : '',
		formType    : '',
		formError   : false,
		formSuccess : '',
		teams       : [],
		formData    : {
			date        : {
				element           : 'input',
				value             : '',
				config            : {
					label : 'Event Date',
					name  : 'date_input',
					type  : 'date'
				},
				validation        : {
					required : true
				},
				valid             : false,
				validationMessage : '',
				showLabel         : true
			},
			local       : {
				element           : 'select',
				value             : '',
				config            : {
					label   : '',
					name    : 'select_local',
					type    : 'select',
					options : []
				},
				validation        : {
					required : true
				},
				valid             : false,
				validationMessage : '',
				showLabel         : false
			},
			resultLocal : {
				element           : 'input',
				value             : '',
				config            : {
					label : '',
					name  : 'result_local_input',
					type  : 'text'
				},
				validation        : {
					required : true
				},
				valid             : false,
				validationMessage : '',
				showLabel         : false
			},
			away        : {
				element           : 'select',
				value             : '',
				config            : {
					label   : '',
					name    : 'select_away',
					type    : 'select',
					options : []
				},
				validation        : {
					required : true
				},
				valid             : false,
				validationMessage : '',
				showLabel         : false
			},
			resultAway  : {
				element           : 'input',
				value             : '',
				config            : {
					label : '',
					name  : 'result_away_input',
					type  : 'text'
				},
				validation        : {
					required : true
				},
				valid             : false,
				validationMessage : '',
				showLabel         : false
			},
			referee     : {
				element           : 'input',
				value             : '',
				config            : {
					label : 'Referee',
					name  : 'referee_input',
					type  : 'text'
				},
				validation        : {
					required : true
				},
				valid             : false,
				validationMessage : '',
				showLabel         : true
			},
			stadium     : {
				element           : 'input',
				value             : '',
				config            : {
					label : 'Stadium',
					name  : 'stadium_input',
					type  : 'text'
				},
				validation        : {
					required : true
				},
				valid             : false,
				validationMessage : '',
				showLabel         : true
			},
			result      : {
				element           : 'select',
				value             : '',
				config            : {
					label   : 'Team Result',
					name    : 'select_result',
					type    : 'select',
					options : [
						{ id: 'W', value: 'W' },
						{ id: 'L', value: 'L' },
						{ id: 'D', value: 'D' },
						{ id: 'n/a', value: 'n/a' }
					]
				},
				validation        : {
					required : true
				},
				valid             : false,
				validationMessage : '',
				showLabel         : true
			},
			final       : {
				element           : 'select',
				value             : '',
				config            : {
					label   : 'Game played?',
					name    : 'select_played',
					type    : 'select',
					options : [
						{ id: 'Yes', value: 'Yes' },
						{ id: 'No', value: 'No' }
					]
				},
				validation        : {
					required : true
				},
				valid             : false,
				validationMessage : '',
				showLabel         : true
			}
		}
	}
	async componentDidMount () {
		try {
			const matchId = this.props.match.params.id
			const getTeams = async (match, type) => {
				const snapshot = await databaseTeams.once('value')
				const teams = firebaseLooper(snapshot)
				const teamOptions = teams.map((team) => ({ key: team.id, value: team.shortName }))
				this.updateFields(match, type, teams, teamOptions, matchId)
			}

			if (!matchId) {
				getTeams(null, 'Add Match')
			}
			else {
				const match = await database.ref(`matches/${matchId}`).once('value')
				getTeams(match.val(), 'Edit Match')
			}
		} catch (e) {
			console.log(e)
		}
	}

	updateFields (match, type, teams, teamOptions, matchId) {
		const newFormData = { ...this.state.formData }
		for (let key in newFormData) {
			if (match) {
				newFormData[key].value = match[key]
				newFormData[key].valid = true
			}
			if (key === 'local' || key === 'away') {
				newFormData[key].config.options = teamOptions
			}
		}
		this.setState({
			matchId,
			formType : type,
			formData : newFormData,
			teams
		})
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

	successForm (message) {
		this.setState({
			formSuccess : message
		})
		setTimeout(() => {
			this.setState({
				formSuccess : ''
			})
		}, 2000)
	}

	async submitForm (event) {
		event.preventDefault()
		let dataToSubmit = {}
		let formIsFalid = true

		Object.keys(this.state.formData).forEach((key) => {
			dataToSubmit[key] = this.state.formData[key].value
			formIsFalid = this.state.formData[key].valid && formIsFalid
		})

		this.state.teams.forEach((team) => {
			if (team.shortName === dataToSubmit.local) {
				dataToSubmit['localThmb'] = team.thmb
			}
			if (team.shortName === dataToSubmit.away) {
				dataToSubmit['awayThmb'] = team.thmb
			}
		})

		if (formIsFalid) {
			if (this.state.formType === 'Edit Match') {
				try {
					await database.ref(`/matches/${this.state.matchId}`).update(dataToSubmit)
					this.successForm('Match updated correctly!')
				} catch (error) {
					this.setState({
						formError : true
					})
				}
			}
			else {
				try {
					await database.ref('matches').push(dataToSubmit)

					this.props.history.push('/admin_matches')
				} catch (error) {
					this.setState({
						formError : true
					})
				}
			}
		}
		else {
			this.setState({ formError: true })
		}
	}

	render () {
		return (
			<AdminLayout>
				<div className="editmatch_dialog_wrapper">
					<h2>{this.state.formType}</h2>
					<form onSubmit={(event) => this.submitForm(event)}>
						<FormField
							id="date"
							formData={this.state.formData.date}
							change={(element) => this.updateForm(element)}
						/>
						<div className="select_team_layout">
							<div className="label_inputs">Local</div>
							<div className="wrapper">
								<div className="left">
									<FormField
										id="local"
										formData={this.state.formData.local}
										change={(element) => this.updateForm(element)}
									/>
								</div>
								<div>
									<FormField
										id="resultLocal"
										formData={this.state.formData.resultLocal}
										change={(element) => this.updateForm(element)}
									/>
								</div>
							</div>
						</div>
						<div className="select_team_layout">
							<div className="label_inputs">Away</div>
							<div className="wrapper">
								<div className="left">
									<FormField
										id="away"
										formData={this.state.formData.away}
										change={(element) => this.updateForm(element)}
									/>
								</div>
								<div>
									<FormField
										id="resultAway"
										formData={this.state.formData.resultAway}
										change={(element) => this.updateForm(element)}
									/>
								</div>
							</div>
						</div>
						<div className="split_fields">
							<FormField
								id="referee"
								formData={this.state.formData.referee}
								change={(element) => this.updateForm(element)}
							/>
							<FormField
								id="stadium"
								formData={this.state.formData.stadium}
								change={(element) => this.updateForm(element)}
							/>
						</div>
						<div className="split_fields last">
							<FormField
								id="result"
								formData={this.state.formData.result}
								change={(element) => this.updateForm(element)}
							/>
							<FormField
								id="final"
								formData={this.state.formData.final}
								change={(element) => this.updateForm(element)}
							/>
						</div>
						<div className="success_label">{this.state.formSuccess}</div>
						{this.state.formError ? <div className="error_label">Something went wrong!</div> : null}
						<div className="admin_submit">
							<button onSubmit={(event) => this.submitForm(event)}>{this.state.formType}</button>
						</div>
					</form>
				</div>
			</AdminLayout>
		)
	}
}

export default AddEditMatch
