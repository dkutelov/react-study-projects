import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import CKEditor from 'react-ckeditor-component'

import withAuth from '../withAuth'
import { ADD_RECIPE, GET_ALL_RECIPES, GET_USER_RECIPES } from '../../queries'
import Error from '../Error'

const initialState = {
	name         : '',
	imageURL     : '',
	instructions : '',
	category     : 'Breakfast',
	description  : '',
	username     : ''
}
class AddRecipe extends Component {
	state = { ...initialState }

	componentDidMount () {
		const { session } = this.props
		if (session.getCurrentUser) {
			this.setState({ username: session.getCurrentUser.username })
		}
	}

	handleChange = (event) => {
		const { name, value } = event.target
		this.setState({ [name]: value })
	}

	handleEditorChange = (event) => {
		const newContent = event.editor.getData()
		this.setState({ instructions: newContent })
	}

	clearState = () => {
		this.setState({ ...initialState })
	}

	handleSubmit = async (event, addRecipe) => {
		event.preventDefault()
		try {
			await addRecipe()
			this.clearState()
			this.props.history.push('/')
		} catch (err) {
			console.log(err)
			this.clearState()
		}
	}

	validateForm = () => {
		const { name, imageURL, instructions, description } = this.state
		const isValid = !name || !imageURL || !instructions || !description
		return isValid
	}

	updateCache = (cache, { data: { addRecipe } }) => {
		const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES })

		cache.writeQuery({
			query : GET_ALL_RECIPES,
			data  : {
				getAllRecipes : [
					addRecipe,
					...getAllRecipes
				]
			}
		})
	}

	render () {
		const { name, imageURL, instructions, description, category, username } = this.state
		return (
			<Mutation
				mutation={ADD_RECIPE}
				variables={{ name, imageURL, instructions, description, category, username }}
				refetchQueries={() => [
					{ query: GET_ALL_RECIPES, variables: { username } },
					{ query: GET_USER_RECIPES, variables: { username } }
				]}
				update={this.updateCache}>
				{(addRecipe, { data, loading, error }) => (
					<div className="App">
						<h2 className="App">Add Recipe</h2>
						<form className="form" onSubmit={(event) => this.handleSubmit(event, addRecipe)}>
							<input
								type="text"
								name="name"
								placeholder="Recipe name"
								onChange={this.handleChange}
								value={name}
							/>
							<input
								type="text"
								name="imageURL"
								placeholder="Recipe image"
								onChange={this.handleChange}
								value={imageURL}
							/>
							<select name="category" onChange={this.handleChange} value={category}>
								<option value="Breakfast">Breakfast</option>
								<option value="Lunch">Lunch</option>
								<option value="Dinner">Dinner</option>
								<option value="Snack">Snack</option>
							</select>
							<input
								type="text"
								name="description"
								placeholder="Add description"
								onChange={this.handleChange}
								value={description}
							/>
							<label htmlFor="instructions">Add instructions</label>
							<CKEditor
								name="instructions"
								content={instructions}
								events={{ change: this.handleEditorChange }}
							/>
							{/* <textarea
								name="instructions"
								placeholder="Add instructions"
								onChange={this.handleChange}
								value={instructions}
							/> */}
							<button disabled={loading || this.validateForm()} type="submit" className="button-primary">
								Submit
							</button>
						</form>
						{error && <Error error={error} />}
					</div>
				)}
			</Mutation>
		)
	}
}

export default withAuth((session) => session && session.getCurrentUser)(withRouter(AddRecipe))
