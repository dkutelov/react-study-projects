import uuid from 'uuid'
import database from '../firebase/firebase'

// ADD_EXPENSE
export const addExpense = expense => ({
	type: 'ADD_EXPENSE',
	expense
})

export const startAddExpense = (expenseData = {}) => {
	return (dispatch, getState) => {
		const uid = getState().auth.uid
		const {
			description = '',
			note = '',
			amount = 0,
			createdAt = 0
		} = expenseData

		const expense = { description, note, amount, createdAt }

		return database
			.ref(`users/${uid}/expenses`)
			.push(expense)
			.then(ref => {
				dispatch(
					addExpense({
						id: ref.key,
						...expense
					})
				)
			})
	}
}

//REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
	type: 'REMOVE_EXPENSE',
	id
})

// // Start remove expenses
// export const startRemoveExpense = ({id}) => {
//   return (dispatch, getState) => {
//     const uid = getState().auth.uid
//     return database.ref(`users/${uid}/expenses/${id}`)
//       .remove()
//         .then( () => {
//         dispatch(removeExpense({id}))
//       })
//   }
// }

// Remove expenses - reworked as per Stephan Gridner Full stack course
// Async await needs babel polyfill to work: https://stackoverflow.com/questions/33527653/babel-6-regeneratorruntime-is-not-defined
export const startRemoveExpense = ({ id }) => async (dispatch, getState) => {
	const uid = getState().auth.uid
	await database.ref(`users/${uid}/expenses/${id}`).remove()
	dispatch({ type: 'REMOVE_EXPENSE', id })
}

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
	type: 'EDIT_EXPENSE',
	id,
	updates
})

// Start adit expenses
export const startEditExpense = (id, expense) => {
	return (dispatch, getState) => {
		const uid = getState().auth.uid
		return database
			.ref(`users/${uid}/expenses/${id}`)
			.update(expense)
			.then(() => {
				dispatch(editExpense(id, expense))
			})
	}
}

// Fetching the expenses fron the database
// 1. Fetch all expenses at once
// 2. Transform the data into an array
// 3. Dispatch the action to load data to the store
// we need to return the promise (database.ref(..)) otherwise the app.js than returns error then of undefined

// SET EXPENSE - FETCHING THE DATA FROM DATABASE
export const setExpenses = expenses => ({
	type: 'SET_EXPENSES',
	expenses
})

export const startSetExpenses = () => {
	return async (dispatch, getState) => {
		const uid = getState().auth.uid
		const snapshot = await database.ref(`users/${uid}/expenses`).once('value')
		const expenses = []
		snapshot.forEach(childSnapshot => {
			expenses.push({
				id: childSnapshot.key,
				...childSnapshot.val()
			})
		})
		dispatch(setExpenses(expenses))
	}
}

// FORMAT "PROMISE" - "THEN"
// export const startSetExpenses = () => {
// 	return (dispatch, getState) => {
// 		const uid = getState().auth.uid
// 		return database
// 			.ref(`users/${uid}/expenses`)
// 			.once('value')
// 			.then(snapshot => {
// 				const expenses = []
// 				snapshot.forEach(childSnapshot => {
// 					expenses.push({
// 						id: childSnapshot.key,
// 						...childSnapshot.val()
// 					})
// 				})
// 				//return expenses
// 				dispatch(setExpenses(expenses))
// 			})
// 	}
// }
