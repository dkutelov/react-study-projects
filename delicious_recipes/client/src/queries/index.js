import { gql } from 'apollo-boost'
import { recipeFragments } from './fragments'
// Recipe queries
export const GET_ALL_RECIPES = gql`
	query {
		getAllRecipes {
			id
			name
			imageURL
			category
		}
	}
`

export const GET_RECIPE_BY_ID = gql`
	query($id: ID!) {
		getRecipe(id: $id) {
			...CompleteRecipe
		}
	}
	${recipeFragments.recipe}
`
export const SEARCH_RECIPES = gql`
	query($searchTerm: String) {
		searchRecipes(searchTerm: $searchTerm) {
			id
			name
			imageURL
			likes
		}
	}
`

export const GET_USER_RECIPES = gql`
	query($username: String!) {
		getUserRecipes(username: $username) {
			id
			name
			imageURL
			description
			category
			likes
		}
	}
`
//Recipe mutations

export const ADD_RECIPE = gql`
	mutation($name: String!, $imageURL: String!, $description: String!, $category: String!, $instructions: String!, $username: String) {
		addRecipe(
			name: $name
			imageURL: $imageURL
			description: $description
			category: $category
			instructions: $instructions
			username: $username
		) {
			...CompleteRecipe
		}
	}
	${recipeFragments.recipe}
`

export const UPDATE_RECIPE = gql`
	mutation($_id: ID!, $name: String!, $imageURL: String!, $description: String!, $category: String!) {
		updateRecipe(
			_id: $_id
			name: $name
			imageURL: $imageURL
			description: $description
			category: $category
		) {
			...CompleteRecipe
		}
	}
	${recipeFragments.recipe}
`

export const DELETE_USER_RECIPE = gql`
	mutation($_id: ID) {
		deleteUserRecipe(_id: $_id) {
			id
		}
	}
`

export const LIKE_RECIPE = gql`
	mutation($_id: ID!, $username: String!, $isLiked: Boolean!) {
		handleLike(_id: $_id, username: $username, isLiked: $isLiked) {
			id
			likes
		}
	}
`

// User queries
export const GET_CURRENT_USER = gql`
	query {
		getCurrentUser {
			username
			email
			joinDate
			favorites {
				id
				name
			}
		}
	}
`
// User mutations
export const SIGN_UP = gql`
	mutation($username: String!, $email: String!, $password: String!) {
		signupUser(username: $username, email: $email, password: $password) {
			token
		}
	}
`

export const SIGN_IN = gql`
	mutation($username: String!, $password: String!) {
		signinUser(username: $username, password: $password) {
			token
		}
	}
`
