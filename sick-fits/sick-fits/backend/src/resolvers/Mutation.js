const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { randomBytes } = require('crypto')
const { promisify } = require('util')

const Mutations = {
	async createItem (parent, args, ctx, info) {
		const item = await ctx.db.mutation.createItem(
			{
				data : {
					...args
				}
			},
			info
		)
		return item
	},
	updateItem (parent, args, ctx, info) {
		const updates = { ...args }
		// remove id because it is not to be updaged
		delete updates.id
		return ctx.db.mutation.updateItem(
			{
				data  : updates,
				where : {
					id : args.id
				}
			},
			info
		)
	},
	async deleteItem (parent, { id }, ctx, info) {
		const where = {
			id
		}

		const item = await ctx.db.query.item({ where }, '{id title}')

		// todo check if the user has right the item
		return ctx.db.mutation.deleteItem(
			{
				where
			},
			info
		)
	},
	async signup (parent, args, ctx, info) {
		//avoid cap letter confusion with emails
		args.email = args.email.toLowerCase()
		// create hash
		const password = await bcrypt.hash(args.password, 10)
		// create the user in db
		const user = await ctx.db.mutation.createUser(
			{
				data : {
					...args,
					password,
					permissions : {
						set : [
							'USER'
						]
					}
				}
			},
			info
		)
		// create JWT token to auto sign in after registration
		const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
		// set jwt as cookie on the response
		ctx.response.cookie('token', token, {
			httpOnly : true,
			maxAge   : 1000 * 60 * 60 * 24 * 365 // 1 year cookie
		})
		// return user to the browser
		return user
	},
	async signin (parent, { email, password }, ctx, info) {
		// user ? with this email
		const user = await ctx.db.query.user({ where: { email } })
		if (!user) {
			throw new Error(`No user with email ${email} exists!`)
		}
		// id password is correct
		const valid = await bcrypt.compare(password, user.password)
		if (!valid) {
			throw new Error('Password not correct!')
		}
		// generate JWT token
		const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
		ctx.response.cookie('token', token, {
			httpOnly : true,
			maxAge   : 1000 * 60 * 60 * 24 * 365 // 1 year cookie
		})

		return user
	},
	async signout (parent, args, ctx, info) {
		ctx.response.clearCookie('token')
		return { message: 'Au revoir' }
	},

	async requestReset (parent, { email }, ctx, info) {
		//1. Check if real user
		const user = await ctx.db.query.user({ where: { email } })

		if (!user) {
			throw new Error(`No user with email ${email} exists!`)
		}
		//2. Set reset token and expiry
		// promisify turns callback func into promise func so we can await
		const RandomBytesPromisified = promisify(randomBytes)
		const resetToken = (await RandomBytesPromisified(20)).toString('hex')
		const resetTokenExpiry = Date.now() + 3600000 // 1 hour from now
		const res = await ctx.db.mutation.updateUser({
			where : {
				email
			},
			data  : {
				resetToken,
				resetTokenExpiry
			}
		})
		console.log(res)
		return { message: 'Thanks' }
		//3. Email them the reset token
	},

	async resetPassword (parent, { resetToken, password, confirmPassword }, ctx, info) {
		//1. Check if passwords match
		if (password !== confirmPassword) {
			throw new Error('Passwords do not match!')
		}
		//2. Check if it is a legit reset token
		//3. Check if expired
		// FIND THE USER BY NON UNIQUE FIELD
		const [
			user
		] = await ctx.db.query.users({ where: { resetToken, resetTokenExpiry_gte: Date.now() - 3600000 } })
		if (!user) {
			throw new Error('This token is invalid or expired!')
		}

		//4. Hash the new password
		const hashedPassword = await bcrypt.hash(password, 10)

		//5. Save new password to the user and remove resetToken fields
		const updatedUser = await ctx.db.mutation.updateUser({
			where : {
				email : user.email
			},
			data  : {
				password         : hashedPassword,
				resetToken       : null,
				resetTokenExpiry : null
			}
		})

		//6. Generate JWT
		// generate JWT token
		const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET)

		//7. Set JWT cookie
		ctx.response.cookie('token', token, {
			httpOnly : true,
			maxAge   : 1000 * 60 * 60 * 24 * 365 // 1 year cookie
		})
		//8. Return new user
		return updatedUser
	}
}

module.exports = Mutations
