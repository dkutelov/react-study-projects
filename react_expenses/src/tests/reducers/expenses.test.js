import moment from 'moment'

import expensesReducer from '../../reducers/expenses'
import expenses from '../fixtures/expenses'

test('should set default state', () => {
	const state = expensesReducer(undefined, { type: '@@INIT' })
	expect(state).toEqual([])
})

// remove - id exists
test('should remove expense by id', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: expenses[1].id
	}
	const state = expensesReducer(expenses, action)
	expect(state).toEqual([expenses[0], expenses[2]])
})

// remove - id des not exists
test('should not remove expense if id do not found', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: '-1'
	}
	const state = expensesReducer(expenses, action)
	expect(state).toEqual(expenses)
})

// add expenses
test('should add an expense', () => {
	const expense = {
		id: '4',
		description: 'Office rent',
		note: '',
		amount: 212121,
		createdAt: moment(0).valueOf()
	}
	const action = {
		type: 'ADD_EXPENSE',
		expense
	}
	const state = expensesReducer(expenses, action)
	expect(state).toEqual([...expenses, expense])
})

// edit expense
test('should edit an expense', () => {
	const id = expenses[1].id
	const updates = {
		description: 'Rent of the month',
		note: '',
		amount: 212121,
		createdAt: moment(0).valueOf()
	}
	const action = {
		type: 'EDIT_EXPENSE',
		id,
		updates
	}
	const state = expensesReducer(expenses, action)
	expect(state[1]).toEqual({ id, ...updates })
})

// edit expense
test('should edit an expense property', () => {
	const id = expenses[1].id
	const updates = {
		description: 'Rent of the month'
	}
	const action = {
		type: 'EDIT_EXPENSE',
		id,
		updates
	}
	const state = expensesReducer(expenses, action)
	expect(state[1].description).toBe(updates.description)
})

// edit expense - should not edit expense if non existing id is passed
test('should edit an expense', () => {
	const id = '-1'
	const updates = {
		description: 'Rent of the month',
		note: '',
		amount: 212121,
		createdAt: moment(0).valueOf()
	}
	const action = {
		type: 'EDIT_EXPENSE',
		id,
		updates
	}
	const state = expensesReducer(expenses, action)
	expect(state).toEqual(expenses)
})

// test set expenses reducer
test('should set expenses', () => {
	const action = {
		type: 'SET_EXPENSES',
		expenses: [expenses[1]]
	}

	const state = expensesReducer(expenses, action)

	expect(state).toEqual([expenses[1]])
})
