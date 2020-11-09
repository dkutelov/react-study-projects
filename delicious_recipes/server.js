const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const jwt = require('jsonwebtoken')
// GraphQL-Express middleware
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')

//Import mongoose models
const Recipe = require('./models/Recipe')
const User = require('./models/User')

// import graphQL schema and resolvers
const { typeDefs } = require('./schema')
const { resolvers } = require('./resolvers')

// variables
require('dotenv').config({ path: '.env' })
const PORT = process.env.PORT || 4444

// create schema
const schema = makeExecutableSchema({
	typeDefs,
	resolvers
})

// Connect to db
mongoose
	.connect(process.env.MONGO_URI, { useNewUrlParser: true })
	.then(() => console.log('DB connected!'))
	.catch((err) => console.log(err))

// App init
const app = express()

// Allow access from client
// Commnet out for deployment app.use(cors('*'))
const corsOtions = {
	origin      : 'http://localhost:3000',
	credentials : true
}
app.use(cors(corsOtions))

// JWT autentication middleware
app.use(async (req, res, next) => {
	const token = req.headers['authorization']
	//when token is null is typeof string !!!
	if (token !== 'null' && token !== '') {
		try {
			const currentUser = await jwt.verify(token, process.env.SECRET)
			// attach verified user to req
			req.currentUser = currentUser
		} catch (err) {
			console.error(err)
		}
	}
	next()
})
// Create GraphiQL application
// app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

// GraphQL middleware - connect mongoose schemas and current user (coming from req) to graphQL
app.use(
	'/graphql',
	bodyParser.json(),
	graphqlExpress(({ currentUser }) => ({
		schema,
		context : {
			Recipe,
			User,
			currentUser
		}
	}))
)

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

// Starts server
app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}!`)
})
