import React, { Component } from 'react'
import { Query } from 'react-apollo'
import posed from 'react-pose'

import './App.css'
import { GET_ALL_RECIPES } from '../queries'
import RecipeItem from './Recipe/RecipeItem'
import Spinner from './Spinner'

const RecipeList = posed.ul({
	hidden : {
		x : '-100%'
	},
	shown  : {
		x               : '0%',
		staggerChildren : 100
	}
})

class App extends Component {
	state = {
		on : false
	}

	componentDidMount () {
		setTimeout(this.toggleAnimation, 200)
	}

	toggleAnimation = () => {
		this.setState((prevState) => ({
			on : !prevState.on
		}))
	}

	render () {
		const { on } = this.state
		return (
			<div className="App">
				<h1 className="main-title">
					Find recipes you <strong>love</strong>
				</h1>
				<Query query={GET_ALL_RECIPES}>
					{({ data, loading, error }) => {
						if (loading) return <Spinner />
						if (error) return <div>Error</div>

						return (
							<RecipeList pose={on ? 'shown' : 'hidden'} className="cards">
								{data.getAllRecipes.map((recipe) => <RecipeItem {...recipe} key={recipe.id} />)}
							</RecipeList>
						)
					}}
				</Query>
			</div>
		)
	}
}

export default App
