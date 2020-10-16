import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import numeral from 'numeral'

import getExpensesAmount from '../selectors/expenses-total'
import selectExpenses from '../selectors/expenses'

const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
	const expenseWord = expenseCount === 1 ? 'expense' : 'expenses'
	const formatedExpensesAmount = numeral(expensesTotal / 100).format('$0,0.00')
	return (
		<div className="page-header">
			<div className="content-container">
				<h1 className="page-header__title">
					Viewing <span>{expenseCount}</span> {expenseWord} totalling{' '}
					<span>{formatedExpensesAmount}</span>.
				</h1>
				<div className="page-header__actions">
					<Link className="button button--link" to="/create">
						Add Expense
					</Link>
				</div>
			</div>
		</div>
	)
}

// getting all expenses matching the current state of filters
const mapStateToProps = state => {
	const visibleExpenses = selectExpenses(state.expenses, state.filters)
	return {
		expenseCount: visibleExpenses.length,
		expensesTotal: getExpensesAmount(visibleExpenses)
	}
}

export default connect(mapStateToProps)(ExpensesSummary)
