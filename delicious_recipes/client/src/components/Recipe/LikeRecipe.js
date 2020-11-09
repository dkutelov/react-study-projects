import React, { Component } from 'react'
import withSession from '../withSession'
import { Mutation } from 'react-apollo'

import { LIKE_RECIPE, GET_RECIPE_BY_ID, GET_CURRENT_USER } from '../../queries'

class LikeRecipe extends Component {
	state = {
		username : '',
		isLiked  : false
	}

	componentDidMount () {
		if (this.props.session.getCurrentUser) {
			const { username } = this.props.session.getCurrentUser
			const isLiked = this.checkIfLiked()
			this.setState({ username, isLiked })
		}
	}

	checkIfLiked = () => {
		const { favorites } = this.props.session.getCurrentUser
		const isLiked = favorites.some((recipe) => recipe.id === this.props.recipe.id)
		return isLiked
	}

	handleLikeButtonClick = (likeRecipe) => {
		likeRecipe()
		this.setState((prevState) => ({ isLiked: !prevState.isLiked }))
	}

	updateLike = (cache, { data: { handleLike } }) => {
		const step = this.state.isLiked ? 1 : -1
		const { recipe } = this.props

		const { getRecipe } = cache.readQuery({
			query     : GET_RECIPE_BY_ID,
			variables : { id: recipe.id }
		})

		const { getCurrentUser } = cache.readQuery({
			query : GET_CURRENT_USER
		})

		cache.writeQuery({
			query     : GET_RECIPE_BY_ID,
			variables : { id: recipe.id },
			data      : {
				getRecipe : { ...getRecipe, likes: handleLike.likes + step }
			}
		})

		const favorites = [
			...getCurrentUser.favorites,
			{
				id         : recipe.id,
				name       : recipe.name,
				__typename : 'Recipe'
			}
		]

		if (this.state.isLiked) {
			cache.writeQuery({
				query : GET_CURRENT_USER,
				data  : {
					getCurrentUser : {
						...getCurrentUser,
						favorites
					}
				}
			})
		}
		else {
			cache.writeQuery({
				query : GET_CURRENT_USER,
				data  : {
					getCurrentUser : {
						...getCurrentUser,
						favorites : getCurrentUser.favorites.filter((item) => item.id !== recipe.id)
					}
				}
			})
		}
	}

	render () {
		const { username, isLiked } = this.state
		const { recipe: { id } } = this.props
		return (
			username && (
				<Mutation mutation={LIKE_RECIPE} variables={{ _id: id, username, isLiked }} update={this.updateLike}>
					{(handleLike, { data, loading, error }) => (
						<button className="like-button" onClick={() => this.handleLikeButtonClick(handleLike)}>
							{isLiked ? 'Unlike' : 'Like'}
						</button>
					)}
				</Mutation>
			)
		)
	}
}

export default withSession(LikeRecipe)
