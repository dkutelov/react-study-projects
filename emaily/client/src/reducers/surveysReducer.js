import _ from 'lodash'

import { FETCH_SURVEYS, DELETE_SURVEY } from '../actions/types'

export default (state = [], action) => {
	//console.log(action)
	switch (action.type) {
		case FETCH_SURVEYS:
			return action.payload
		case DELETE_SURVEY:
			return _.filter(state, survey => survey._id !== action.payload)
		default:
			return state
	}
}
