import React from 'react'
import { shallow } from 'enzyme'
import expenses from '../fixtures/expenses'
import ExpenseListItem from '../../components/ExpenseListItem'

const ExpenseList = ({ expenses }) => (
	<div>
		{expenses.length === 0 ? (
			<p>No expenses.</p>
		) : (
			expenses.map(expense => {
				return <ExpenseListItem key={expense.id} {...expense} />
			})
		)}
	</div>
)

test('should render ExpenseList with expenses', () => {
	const wrapper = shallow(<ExpenseList expenses={expenses} />)
	expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseList with empty message', () => {
	const wrapper = shallow(<ExpenseList expenses={[]} />)
	expect(wrapper).toMatchSnapshot()
})
