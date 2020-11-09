import axios from 'axios'
import {
	FETCH_USER,
	LOGOUT_USER,
	FETCH_SURVEY,
	FETCH_SURVEYS,
	DELETE_SURVEY
} from './types'

export const fetchUser = () => async dispatch =>
	dispatch({ type: FETCH_USER, payload: await axios.get('/api/user') })

export const logoutUser = () => async dispatch => {
	const res = await axios.get('/api/logout')
	dispatch({ type: LOGOUT_USER, payload: res.data })
}

export const handleToken = token => async dispatch => {
	const res = await axios.post('/api/stripe', token)
	dispatch({ type: FETCH_USER, payload: res })
}

export const submitSurvey = (values, history) => async dispatch => {
	const res = await axios.post('/api/surveys', values)
	dispatch({ type: FETCH_USER, payload: res })
	history.push('/surveys')
}

export const fetchSurveys = () => async dispatch => {
	const res = await axios.get('/api/surveys')
	dispatch({ type: FETCH_SURVEYS, payload: res.data })
}

//---
export const fetchSurvey = surveyId => async dispatch => {
	const res = await axios.post('/api/fetch/survey', surveyId)
	dispatch({ type: FETCH_SURVEY, payload: res.data })
}
//---
export const deleteSurvey = surveyId => async dispatch => {
	try {
		const res = await axios.post('/api/surveys/delete', { surveyId })
		if (!res) {
			console.log('No survey found!')
		}
	} catch (err) {
		console.log('Error: ', err)
		return
	}
	dispatch({ type: DELETE_SURVEY, payload: surveyId })
}
