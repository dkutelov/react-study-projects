import filtersReducer from '../../reducers/filters'
import moment from 'moment'

// default values are set correctly
test('should setup default filter values', () => {
	const state = filtersReducer(undefined, { type: '@@INIT' })
	expect(state).toEqual({
		text: '',
		sortBy: 'date',
		startDate: moment().startOf('month'),
		endDate: moment().endOf('month')
	})
})

test('should set sort by amount', () => {
	const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' })
	expect(state.sortBy).toBe('amount')
})

// since date is default we need first to set the state sortBy: 'amount'
test('should set sort by date', () => {
	const currentState = {
		text: '',
		sortBy: 'amount',
		startDate: undefined,
		endDate: undefined
	}
	const state = filtersReducer(currentState, { type: 'SORT_BY_DATE' })
	expect(state.sortBy).toBe('date')
})

test('should set text', () => {
	const state = filtersReducer(undefined, {
		type: 'SET_TEXT_FILTER',
		text: 'dari'
	})
	expect(state.text).toBe('dari')
})

test('should set start date', () => {
	const state = filtersReducer(undefined, {
		type: 'SET_START_DATE',
		startDate: moment(0)
	})
	expect(state.startDate).toEqual(moment(0))
})

test('should set end date', () => {
	const state = filtersReducer(undefined, {
		type: 'SET_END_DATE',
		endDate: moment(0)
	})
	expect(state.endDate).toEqual(moment(0))
})
