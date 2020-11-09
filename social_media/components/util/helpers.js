import { format, distanceInWordsToNow } from 'date-fns'

const formatTimeCreated = (time) =>
	distanceInWordsToNow(time, {
		includeSeconds : true,
		addSuffix      : true
	})

const formatDate = (time) => format(time, 'Do MMMM YYYY')

export { formatTimeCreated, formatDate }
