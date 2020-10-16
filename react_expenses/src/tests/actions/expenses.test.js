import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import database from '../../firebase/firebase'

import {
	addExpense,
	editExpense,
	removeExpense,
	startAddExpense,
	setExpenses,
	startSetExpenses
} from '../../actions/expenses'
import expenses from '../fixtures/expenses'

const createMockStore = configureMockStore([thunk])

beforeEach(done => {
	const expenseData = {}
	expenses.forEach(({ id, description, note, amount, createdAt }) => {
		expenseData[id] = { description, note, amount, createdAt }
	})
	database
		.ref('expenses')
		.set(expenseData)
		.then(() => done())
})

test('should set up remove expense action object', () => {
	const action = removeExpense({ id: '123abc' })
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		id: '123abc'
	})
})

test('should set up edit expense action object', () => {
	const action = editExpense('123abc', { note: 'new note' })
	expect(action).toEqual({
		type: 'EDIT_EXPENSE',
		id: '123abc',
		updates: { note: 'new note' }
	})
})

test('should set up add expense action object', () => {
	// const expenseData = {
	// 	description: 'Rent',
	// 	amount: 10900,
	// 	createdAt: 1000,
	// 	note: "This was last months' rent"
	// }
	const action = addExpense(expenses[2])
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			...expenses[2]
		}
	})
})

// For axync
test('Should add expense to database and store', done => {
	const uid = 'qfdbikuDG1afuZb3Mmzkg0B4SBu1'

	const store = createMockStore({
		auth: { uid }
	})

	const expenseData = {
		description: 'Mouse',
		amount: 1000,
		createdAt: 10000,
		note: 'Buy better mouse'
	}

	store
		.dispatch(startAddExpense(expenseData))
		.then(() => {
			const actions = store.getActions()

			expect(actions[0]).toEqual({
				type: 'ADD_EXPENSE',
				expense: {
					id: expect.any(String),
					...expenseData
				}
			})

			return database
				.ref(`users/${uid}/expenses/${actions[0].expense.id}`)
				.once('value')
		})
		.then(snapshot => {
			expect(snapshot.val()).toEqual(expenseData)
			done()
		})
})

test('Should add expense to database and store with default', done => {
	const uid = 'qfdbikuDG1afuZb3Mmzkg0B4SBu1'

	const store = createMockStore({
		auth: { uid }
	})

	const defaultExpenseData = {
		description: '',
		amount: 0,
		createdAt: 0,
		note: ''
	}

	store
		.dispatch(startAddExpense({}))
		.then(() => {
			const actions = store.getActions()

			expect(actions[0]).toEqual({
				type: 'ADD_EXPENSE',
				expense: {
					id: expect.any(String),
					...defaultExpenseData
				}
			})

			return database
				.ref(`users/${uid}/expenses/${actions[0].expense.id}`)
				.once('value')
		})
		.then(snapshot => {
			expect(snapshot.val()).toEqual(defaultExpenseData)
			done()
		})
})

//Test setExpenses

test('should set up expense action object with data', () => {
	const action = setExpenses(expenses)
	expect(action).toEqual({
		type: 'SET_EXPENSES',
		expenses
	})
})

// test('Should fetch expenses from firebase', done => {
// 	const uid = 'qfdbikuDG1afuZb3Mmzkg0B4SBu1'
// 	const store = createMockStore({
// 		auth: { uid }
// 	})
// 	store.dispatch(startSetExpenses()).then(fetchedExpenses => {
// 		const actions = store.getActions()
// 		console.log(actions)
// 		expect(actions[0]).toEqual({
// 			type: 'SET_EXPENSES',
// 			expenses: fetchedExpenses
// 		})
// 		done()
// 	})
// })
