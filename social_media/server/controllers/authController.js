const mongoose = require('mongoose')
const User = mongoose.model('User')
const passport = require('passport')

exports.validateSignup = (req, res, next) => {
	// express validator function
	req.sanitizeBody('name')
	req.sanitizeBody('email')
	req.sanitizeBody('password')

	// check if name is not null and 4-10chars
	req.checkBody('name', 'Enter a name!').notEmpty()
	req.checkBody('name', 'Name must be between 4 and 10 characters!').isLength({ min: 4, max: 10 })
	// check if email is not null, valid and normalized
	req.checkBody('email', 'Enter a valid email!').isEmail().normalizeEmail()
	// password same like name
	req.checkBody('password', 'Enter a password!').notEmpty()
	req.checkBody('password', 'Password must be between 4 and 10 characters!').isLength({ min: 4, max: 10 })

	const errors = req.validationErrors()

	if (errors) {
		const firstError = errors.map((error) => error.msg)[0]
		return res.status(400).send(firstError)
	}
	// if no errors, go to sing up
	next()
}

exports.signup = async (req, res, next) => {
	const { name, email, password } = req.body
	// passportLocalMongoose plugin will hash the password and save the instance
	const user = await new User({ name, email, password })
	// register is a method of passportLocalMongoose
	await User.register(user, password, (err, user) => {
		if (err) {
			return res.status(500).send(err.message)
		}
		res.json(user.name)
	})
}

exports.signin = (req, res, next) => {
	// need  to call authenticate with req,res,next to have access to these in the authenticate method
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			return res.status(500).json(err.message)
		}
		if (!user) {
			return res.status(400).json(info.message)
		}
		req.logIn(user, (err) => {
			if (err) {
				return res.status(500).json(err.message)
			}
			res.json(user)
		})
	})(req, res, next)
}

exports.signout = (req, res) => {
	res.clearCookie('next-connect.sid')
	req.logout()
	res.json({ message: 'You are now signed out!' })
}

exports.checkAuth = (req, res, next) => {
	// isAuthenticated is a passport method
	if (req.isAuthenticated()) {
		return next()
	}
	res.redirect('/signin')
}
