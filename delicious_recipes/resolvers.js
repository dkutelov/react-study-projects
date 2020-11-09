const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createToken = (user, secret, expiresIn) => {
	const { username, email } = user
	return jwt.sign({ username, email }, secret, { expiresIn })
}

exports.resolvers = {
	Query    : {
		getAllRecipes  : async (root, args, { Recipe }) => {
			const allRecipes = await Recipe.find().sort({ createdDate: 'desc' })
			return allRecipes
		},
		getCurrentUser : async (root, args, { currentUser, User }) => {
			if (!currentUser) {
				return null
			}
			const user = await User.findOne({ username: currentUser.username }).populate({
				path  : 'favorites',
				model : 'Recipe'
			})
			// populate will inject  the favorite recipes, otherwise it will return only the _id
			return user
		},
		getRecipe      : async (root, { id }, { Recipe }) => {
			const recipe = await Recipe.findById(id)
			return recipe
		},
		searchRecipes  : async (root, { searchTerm }, { Recipe }) => {
			if (searchTerm) {
				// search all text fields as indexed in the Recipe model
				// score is new meta field added to each recipe with score how close it matches the search term
				const SearchResults = await Recipe.find(
					{
						$text : { $search: searchTerm }
					},
					{
						score : {
							$meta : 'textScore'
						}
					}
				).sort({
					score : {
						$meta : 'textScore'
					}
				})
				return SearchResults
			}
			else {
				const recipes = await Recipe.find().sort({
					likes       : 'desc',
					createdDate : 'desc'
				})
				return recipes
			}
		},
		getUserRecipes : async (root, { username }, { Recipe }) => {
			const recipes = await Recipe.find({ username }).sort({
				likes       : 'desc',
				createdDate : 'desc'
			})
			return recipes
		}
	},
	Mutation : {
		addRecipe        : async (
			root,
			{ name, description, imageURL, category, instructions, username },
			{ Recipe }
		) => {
			const newRecipe = await new Recipe({
				name,
				imageURL,
				description,
				category,
				instructions,
				username
			}).save()
			return newRecipe
		},
		deleteUserRecipe : async (root, { _id }, { Recipe }) => {
			// not removed from favorites
			let recipe = {}
			try {
				recipe = await Recipe.findOneAndDelete({ _id })
			} catch (err) {
				console.log(err)
			}
			return recipe
		},
		updateRecipe     : async (root, { _id, name, description, imageURL, category }, { Recipe }) => {
			let updatedRecipe
			try {
				updatedRecipe = await Recipe.findOneAndUpdate(
					{ _id },
					{ $set: { name, imageURL, category, description } },
					{ new: true }
				)
			} catch (error) {
				console.log(error)
			}
			return updatedRecipe
		},
		handleLike       : async (root, { _id, username, isLiked }, { Recipe, User }) => {
			let recipe = {}
			const step = isLiked ? '-1' : '1'
			const operator = isLiked ? '$pull' : '$push'
			try {
				recipe = await Recipe.findByIdAndUpdate(_id, { $inc: { likes: step } })

				await User.findOneAndUpdate(
					{ username },
					{
						[operator] : {
							favorites : _id
						}
					}
				)
			} catch (err) {
				console.log(err)
			}
			return recipe
		},
		signupUser       : async (root, { username, email, password }, { User }) => {
			const user = await User.findOne({ username })
			if (user) {
				throw new Error('User already exists!')
			}
			email = email.toLowerCase()
			const newUser = await new User({ username, email, password }).save()
			return { token: createToken(newUser, process.env.SECRET, '1hr') }
		},
		signinUser       : async (root, { username, password }, { User }) => {
			const user = await User.findOne({ username })
			if (!user) {
				throw new Error('User not found!')
			}
			const isValidPassword = await bcrypt.compare(password, user.password)
			if (!isValidPassword) {
				throw new Error('Password not correct!')
			}

			return { token: createToken(user, process.env.SECRET, '1hr') }
		}
	}
}
