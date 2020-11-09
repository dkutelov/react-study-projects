const mongoose = require('mongoose')
const { Schema } = mongoose

const recipientSchema = require('./Recipient')

const surveySchema = new Schema({
	title: {
		type: String
	},
	subject: {
		type: String
	},
	body: {
		type: String
	},
	emailfrom: {
		type: String
	},
	recipients: [recipientSchema],
	yes: { type: Number, default: 0 },
	no: { type: Number, default: 0 },
	_user: { type: Schema.Types.ObjectId, ref: 'User' },
	dateSent: Date,
	lastResponded: Date,
	isSent: {
		type: Boolean,
		default: false
	}
})

const Survey = mongoose.model('survey', surveySchema)
module.exports = Survey
