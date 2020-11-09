const sendgrid = require('sendgrid')
const helper = sendgrid.mail // ES6 const { mail:helper } = sendgrid
const keys = require('../config/keys')

class Mailer extends helper.Mail {
	// when you create 'new' instnace the constructor is called and arguments are provided to the constructor
	// content is the string returned from surveyTemplate file
	constructor({ subject, recipients, emailfrom }, content) {
		super() // calls all methods on the helper.Mail

		this.sgApi = sendgrid(keys.sendGridKey)
		this.from_email = new helper.Email(emailfrom || 'no-reply@emaily.com')
		this.subject = subject
		this.body = new helper.Content('text/html', content)
		this.recipients = this.formatAddresses(recipients)

		// addContent is a method of Mail
		this.addContent(this.body)
		this.addClickTracking()
		this.addRecipients()
	}

	formatAddresses(recipients) {
		// to destructure in arrow function we need the ()
		return recipients.map(({ email }) => {
			return new helper.Email(email)
		})
	}

	// helper function that we copy from sendgrid documentation
	addClickTracking() {
		const trackingSettings = new helper.TrackingSettings()
		const clickTracking = new helper.ClickTracking(true, true)

		trackingSettings.setClickTracking(clickTracking)
		this.addTrackingSettings(trackingSettings)
	}

	addRecipients() {
		const personalize = new helper.Personalization()
		personalize.addTo(this.from_email)
		this.recipients.forEach(recipient => {
			personalize.addBcc(recipient)
		})
		this.addPersonalization(personalize)
	}

	async send() {
		const request = this.sgApi.emptyRequest({
			method: 'POST',
			path: '/v3/mail/send',
			body: this.toJSON()
		})

		const response = await this.sgApi.API(request)
		return response
	}
}

module.exports = Mailer
