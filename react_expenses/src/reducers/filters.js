import moment from 'moment'

// Filters Reducer
const filtersReducerDefaultState = {
	text: '',
	sortBy: 'date',
	startDate: moment().startOf('month'),
	endDate: moment().endOf('month')
}

// if you pass state with few of the properties, the rest will not be set to the default values

//startDate: moment().subtract(60, 'days'),
export default (state = filtersReducerDefaultState, action) => {
	switch (action.type) {
		case 'SET_TEXT_FILTER':
			return {
				...state,
				text: action.text
			}
		case 'SORT_BY_AMOUNT':
			return {
				...state,
				sortBy: 'amount'
			}
		case 'SORT_BY_DATE':
			return {
				...state,
				sortBy: 'date'
			}
		case 'SET_START_DATE':
			return {
				...state,
				startDate: action.startDate
			}
		case 'SET_END_DATE':
			return {
				...state,
				endDate: action.endDate
			}
		default:
			return state
	}
}
