import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import SurveyList from './surveys/SurveyList'

class Dashboard extends Component {
	state = {
		sortOrder: true
	}
	render() {
		return (
			<div>
				<h3>Dashboard</h3>
				<div className="row">
					<div className="right">
						Sort by date:
						<button
							onClick={() => this.setState({ sortOrder: true })}
							className="orange btn sort-button white-text">
							Latest
						</button>
						<button
							onClick={() => this.setState({ sortOrder: false })}
							className="orange btn sort-button white-text">
							Oldest
						</button>
					</div>
				</div>
				<SurveyList sortOrder={this.state.sortOrder} />
				<div className="fixed-action-btn">
					<Link to="/surveys/new" className="btn-floating btn-large red">
						<i className="material-icons">add</i>
					</Link>
				</div>
			</div>
		)
	}
}

export default Dashboard
