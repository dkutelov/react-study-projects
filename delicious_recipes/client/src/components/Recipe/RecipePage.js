import React from 'react'
import { Query } from 'react-apollo'

import { GET_RECIPE_BY_ID } from '../../queries'
import LikeRecipe from './LikeRecipe'
import Spinner from '../Spinner'

const formatDate = (date) => {
	const newDate = new Date(Number(date)).toLocaleDateString('en-US')
	const newTime = new Date(Number(date)).toLocaleTimeString('en-US')
	return `${newDate} at ${newTime}`
}

const RecipePage = ({ match }) => {
	const recipeId = match.params.id
	return (
		<Query query={GET_RECIPE_BY_ID} variables={{ id: recipeId }}>
			{({ data, loading, error }) => {
				if (loading) return <Spinner />
				if (error) return <div>Error</div>
				const recipe = data.getRecipe
				return (
					<div className="App">
						<div
							style={{ background: `url(${recipe.imageURL}) center center / cover no-repeat` }}
							className="recipe-image"
						/>
						<div className="recipe">
							<div className="recipe-header">
								<h2 className="recipe-name">
									<strong>{recipe.name}</strong>
								</h2>
							</div>

							<h5>
								<strong>{recipe.category}</strong>
							</h5>
							<p>
								Created by <strong>{recipe.username}</strong>
							</p>
							<p>Created: {formatDate(recipe.createdDate)}</p>
							<p>
								Likes: {recipe.likes}
								<span role="img" aria-label="heart">
									❤️
								</span>
							</p>
						</div>
						<blockquote className="recipe-description">{recipe.description}</blockquote>
						<h3 className="recipe-instructions__title">Instructions</h3>
						<div
							className="recipe-instructions"
							dangerouslySetInnerHTML={{ __html: recipe.instructions }}
						/>
						<LikeRecipe recipe={recipe} />
					</div>
				)
			}}
		</Query>
	)
}

export default RecipePage
