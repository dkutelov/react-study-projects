const mongoose = require('mongoose')
const _ = require('lodash')
const Path = require('path-parser')
const { URL } = require('url')

const express = require('express')
const router = express.Router()

const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')

const Mailer = require('../services/Mailer')
const Survey = mongoose.model('survey')
const surveyTemplate = require('../services/emailTempalates/quickgelMarchTemplate.js')
//const surveyTemplate = require('../services/emailTempalates/surveyTemplate')

module.exports = app => {
	//GET - UNSUBCSCIBE
	app.get('/api/survey/:surveyId/unsubscribe', (req, res) => {
		res.send(
			'Успешно бяхте отписани и вече няма да получавате имейли от нас. Имейлът ви е изтрит от нашата база данни! Съжаляваме, ако сме ви обезпокоили.'
		)
	})

	app.get('/api/survey/:surveyId/:choice', (req, res) => {
		const redirectToUrl = '/results/' + req.params.surveyId
		res.redirect(redirectToUrl)
	})

	app.post('/api/fetch/survey', (req, res) => {
		const { surveyId } = req.body
		Survey.findById(surveyId, (err, { body, yes, no }) => {
			const surveyData = { body, yes, no }
			res.send(surveyData)
		})
	})

	app.get('/api/surveys', requireLogin, async (req, res) => {
		// req.user is available
		// _user contains the user id

		// set recepients to true only when isSent is false, otherwise false
		// const surveys = await Survey.find({ _user: req.user.id }).select({
		// 	recipients: true
		// })

		const surveys = await Survey.find({ _user: req.user.id })
		res.send(surveys)
	})

	// checks if user is logged in and has enough credits
	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
		const { title, subject, body, recipients, emailfrom, isSent } = req.body

		// prevent empty emails , , , email.trim().length && { email: email.trim() }
		const survey = new Survey({
			title,
			subject,
			body,
			emailfrom,
			recipients: recipients.split(',').map(email => ({ email: email.trim() })),
			_user: req.user.id,
			dateSent: Date.now()
		})

		// Draft exists -> update, draft does not exist -> new save
		if (isSent) {
			// Send email
			const mailer = new Mailer(survey, surveyTemplate(survey))
			survey.isSent = true

			try {
				await mailer.send()
				if (req.body.id) {
					// update all fields
					const recipientsArray = recipients
						.split(',')
						.map(email => ({ email: email.trim() }))
					await Survey.findByIdAndUpdate(
						req.body.id,
						{
							$set: {
								title,
								subject,
								body,
								emailfrom,
								recipients: recipientsArray,
								isSent: true
							}
						},
						(err, survey) => res.send(survey)
					)
				} else {
					// Save new survey to db
					await survey.save()
				}
				// Reduce credits
				req.user.credits -= 1
				const user = await req.user.save()
				// Send back the user to update the credits
				res.send(user)
			} catch (err) {
				// code 422 means you provided wrong data
				res.status(422).send(err)
			}
		} else {
			// check if draft exists and update
			if (req.body.id) {
				const recipientsArray = recipients
					.split(',')
					.map(email => ({ email: email.trim() }))
				Survey.findByIdAndUpdate(
					req.body.id,
					{
						$set: {
							title,
							subject,
							body,
							emailfrom,
							recipients: recipientsArray
						}
					},
					(err, survey) => res.send(survey)
				)
			} else {
				// create new draft
				survey.save(() => res.status(200))
			}
		}
	})

	// POST - WEBHOOKS VOTES
	app.post('/api/surveys/webhook', (req, res) => {
		//create new instance of Path outside the map, we do not need to create it evey time
		const p = new Path('/api/survey/:surveyId/:choice')
		//const pUnsub = new Path('/api/survey/:surveyId')
		// Create an array of objects with email, surveyid and choice of valid events
		_.chain(req.body)
			.map(({ email, url, event }) => {
				// eliminates other event types
				if (event !== 'click') {
					return
				}

				// get survey ID and choice
				const match = p.test(new URL(url).pathname)

				// if p.test does not extract, it will return null so we eliminate empty requests
				if (match) {
					return {
						email,
						surveyId: match.surveyId,
						choice: match.choice
					}
				}
			})
			.compact()
			.uniqBy('email', 'surveyId')
			.each(({ surveyId, email, choice }) => {
				// find the record and update with the second object
				// the update is in the database not in express
				// we do not need any async because we are not doing anythig

				if (choice === 'yes' || choice === 'no') {
					Survey.updateOne(
						{
							_id: surveyId,
							recipients: {
								$elemMatch: { email: email, responded: false }
							}
						},
						{
							$inc: { [choice]: 1 },
							$set: { 'recipients.$.responded': true },
							lastResponded: new Date()
						}
					).exec()
				} else if (choice === 'unsubscribe') {
					Survey.updateOne(
						{
							_id: surveyId,
							recipients: {
								$elemMatch: { email: email }
							}
						},
						{
							$set: { 'recipients.$.unsubscribed': true }
						}
					).exec()
				}
			})
			.value()

		res.send({})
	})

	// POST - delete survey
	app.post('/api/surveys/delete', (req, res) => {
		const { surveyId } = req.body
		Survey.remove({ _id: surveyId }, err => {
			res.status(200).send(err)
		})
	})
}
