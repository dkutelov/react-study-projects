import React, { Component } from 'react'
import { connect } from 'react-redux'
import numeral from 'numeral'

import ExpenseListItem from './ExpenseListItem'
import selectExpenses from '../selectors/expenses'
import { startSetExpenses } from '../actions/expenses'

class ExpenseList extends Component {
	componentWillMount() {
		this.props.dispatch(startSetExpenses())
	}

	render() {
		const { expenses } = this.props
		return (
			<div className="content-container">
				<div className="list-header">
					<div className="show-for-mobile">Expenses</div>
					<div className="show-for-desktop">Expense</div>
					<div className="show-for-desktop">Amount</div>
				</div>
				<div className="list-body">
					{expenses.length === 0 ? (
						<div>
							<span className="list-item list-item--message">No expenses</span>
						</div>
					) : (
						''
					)}

					{this.props.expenses.map(expense => {
						return <ExpenseListItem key={expense.id} {...expense} />
					})}
				</div>
			</div>
		)
	}
}

// getting all expenses matching the current state of filters
const mapStateToProps = state => {
	return {
		expenses: selectExpenses(state.expenses, state.filters)
	}
}

export default connect(mapStateToProps)(ExpenseList)
