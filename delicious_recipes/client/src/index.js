import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { ApolloClient } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

import './index.css'

import withSession from './components/withSession'
import App from './components/App'
import Signin from './components/Auth/Signin'
import Signup from './components/Auth/Signup'
import Navbar from './components/Navbar'
import Search from './components/Recipe/Search'
import AddRecipe from './components/Recipe/AddRecipe'
import Profile from './components/Profile'
import RecipePage from './components/Recipe/RecipePage'

const cache = new InMemoryCache()

const httpLink = new HttpLink({
	uri : 'https://delicious-recipes.herokuapp.com/graphql'
})

// Sending token to back end in header in authorization key
const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem('token')
	// return the headers to the context so httpLink can read them
	return {
		headers : {
			...headers,
			authorization : token
		}
	}
})

const client = new ApolloClient({
	link         : authLink.concat(httpLink),
	cache,
	fetchOptions : {
		credentials : 'include'
	}
})

// refetch passed down from query in withSession
const Root = ({ refetch, session }) => (
	<Router>
		<Fragment>
			<Navbar session={session} />
			<Switch>
				<Route path="/" exact component={App} />
				<Route path="/search" component={Search} />
				<Route path="/recipe/add" render={() => <AddRecipe session={session} />} />
				<Route path="/recipe/:id" component={RecipePage} />
				<Route path="/profile" render={() => <Profile session={session} />} />
				<Route path="/signin" render={() => <Signin refetch={refetch} />} />
				<Route path="/signup" render={() => <Signup refetch={refetch} />} />
				<Redirect to="/" />
			</Switch>
		</Fragment>
	</Router>
)

const RootWithSession = withSession(Root)

const AppContainer = () => (
	<ApolloProvider client={client}>
		<RootWithSession />
	</ApolloProvider>
)

ReactDOM.render(<AppContainer />, document.getElementById('root'))
