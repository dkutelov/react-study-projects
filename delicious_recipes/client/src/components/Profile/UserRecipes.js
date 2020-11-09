import React, { Component, Fragment } from 'react'
import { Query, Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'

import { GET_USER_RECIPES, DELETE_USER_RECIPE, GET_ALL_RECIPES, GET_CURRENT_USER, UPDATE_RECIPE } from '../../queries'
import Spinner from '../Spinner'
import EditRecipeModal from './EditRecipeModal'

class UserRecipes extends Component {
	state = {
		_id         : '',
		name        : '',
		imageURL    : '',
		category    : '',
		description : '',
		modal       : false
	}

	handleChange = (event) => {
		const { name, value } = event.target
		this.setState({ [name]: value })
	}

	handleDelete = async (deleteUserRecipe) => {
		const confirmDelete = window.confirm('Are you sure you want to delete the recipe?')
		if (confirmDelete) {
			await deleteUserRecipe()
		}
	}

	closeModal = () => {
		this.setState({ modal: false })
	}

	loadRecipe = (recipe) => {
		console.log(recipe)

		this.setState({ ...recipe, _id: recipe.id, modal: true })
	}

	handleSubmit = (event, updateRecipe) => {
		event.preventDefault()
		updateRecipe().then(() => {
			// console.log(data)
			this.closeModal()
		})
	}

	render () {
		const { username } = this.props
		const { modal } = this.state
		return (
			<Query query={GET_USER_RECIPES} variables={{ username }}>
				{({ data, loading, error }) => {
					if (loading) return <Spinner />
					if (error) return <div>Error</div>
					return (
						<Fragment>
							{modal && (
								<Mutation mutation={UPDATE_RECIPE} variables={{ ...this.state }}>
									{(updateRecipe, { data, loading, error }) => (
										<EditRecipeModal
											handleChange={this.handleChange}
											closeModal={this.closeModal}
											recipe={this.state}
											updateRecipe={updateRecipe}
											handleSubmit={this.handleSubmit}
										/>
									)}
								</Mutation>
							)}
							<h4>My recipes</h4>
							{!data.getUserRecipes.length && <p>You do not have recipes yet.</p>}
							<ul>
								{data.getUserRecipes.map((recipe) => (
									<li key={recipe.id}>
										<Link to={`/recipe/${recipe.id}`}>
											<p>{recipe.name}</p>
										</Link>
										<p style={{ marginBottom: 0 }}>Likes: {recipe.likes}</p>
										<Mutation
											mutation={DELETE_USER_RECIPE}
											variables={{ _id: recipe.id }}
											refetchQueries={() => [
												{ query: GET_ALL_RECIPES },
												{ query: GET_CURRENT_USER }
											]}
											update={(cache, { data }) => {
												const { deleteUserRecipe } = data
												const { getUserRecipes } = cache.readQuery({
													query     : GET_USER_RECIPES,
													variables : { username }
												})
												cache.writeQuery({
													query     : GET_USER_RECIPES,
													variables : { username },
													data      : {
														getUserRecipes : getUserRecipes.filter(
															(item) => item.id !== deleteUserRecipe.id
														)
													}
												})
											}}>
											{(deleteUserRecipe, attrs = {}) => {
												return (
													<Fragment>
														<button
															className="button-primary"
															onClick={() => this.loadRecipe(recipe)}>
															Update
														</button>
														<p
															className="delete-button"
															onClick={() => this.handleDelete(deleteUserRecipe)}>
															{attrs.loading ? 'Deleting ...' : 'X'}
														</p>
													</Fragment>
												)
											}}
										</Mutation>
									</li>
								))}
							</ul>
						</Fragment>
					)
				}}
			</Query>
		)
	}
}

export default UserRecipes
