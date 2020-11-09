// converts string of coma separated email in array of trimmed emails
// filter if valid returns false if invalid returns true
const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default emails => {
	const invalidEmails = emails
		.split(',')
		.map(email => email.trim())
		.filter(email => email.length && re.test(email) === false)

	if (invalidEmails.length) {
		return `The emails are invalid: ${invalidEmails}`
	}

	return
}
