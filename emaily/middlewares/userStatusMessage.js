module.exports = (req, res, next) => {
	if (req.user) {
		console.log('You are logged!')
	} else {
		console.log('You are logged out!')
	}
	next()
}
