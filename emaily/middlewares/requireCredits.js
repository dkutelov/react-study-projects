module.exports = (req, res, next) => {
	if (req.user.credits < 1) {
		// Do something to show users this error
		return res.status(403).send({ error: 'You must buy credits!' })
	}
	next()
}
