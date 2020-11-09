// Start up the Yoga server
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

require('dotenv').config({
	path : '.env'
})
const createServer = require('./createServer')
const db = require('./db')

const server = createServer()
// Use express middleware to handle cookies JMT e.g. read the cookies from the backend in an object
server.express.use(cookieParser())

server.express.use((req, res, next) => {
	const { token } = req.cookies
	if (token) {
		const { userId } = jwt.verify(token, process.env.APP_SECRET)
		req.userId = userId
	}
	next()
})

server.start(
	{
		cors : {
			credentials : true,
			origin      : process.env.FRONTEND_URL
		}
	},
	(deets) => {
		console.log(`Server is running on port: ${deets.port}.`)
	}
)
